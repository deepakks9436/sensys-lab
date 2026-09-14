"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "../../../../lib/supabase/server";

async function requireManager() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (
    !profile ||
    !["admin", "manager"].includes(profile.role)
  ) {
    throw new Error(
      "You do not have permission to modify inventory."
    );
  }

  return {
    supabase,
    user,
  };
}

function optionalText(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text || null;
}

function optionalDate(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text || null;
}

function numberValue(
  value: FormDataEntryValue | null,
  fallback = 0
) {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    return fallback;
  }

  return parsed;
}

function deriveStockStatus(
  quantity: number,
  minimumStock: number
) {
  if (quantity <= 0) {
    return "Out of Stock";
  }

  if (quantity <= minimumStock) {
    return "Low Stock";
  }

  return "In Stock";
}

export async function addConsumable(
  formData: FormData
) {
  const { supabase, user } = await requireManager();

  const name = String(
    formData.get("name") ?? ""
  ).trim();

  if (!name) {
    redirect(
      "/hub/inventory/consumables/new?error=Consumable%20name%20is%20required."
    );
  }

  const quantity = numberValue(
    formData.get("quantity")
  );

  const minimumStock = numberValue(
    formData.get("minimum_stock")
  );

  const reorderQuantity = numberValue(
    formData.get("reorder_quantity")
  );

  const { error } = await supabase
    .from("consumables")
    .insert({
      name,

      category: optionalText(
        formData.get("category")
      ),

      supplier: optionalText(
        formData.get("supplier")
      ),

      catalog_number: optionalText(
        formData.get("catalog_number")
      ),

      quantity,

      unit:
        optionalText(formData.get("unit")) ??
        "unit",

      minimum_stock: minimumStock,

      reorder_quantity: reorderQuantity,

      location: optionalText(
        formData.get("location")
      ),

      project: optionalText(
        formData.get("project")
      ),

      last_purchased: optionalDate(
        formData.get("last_purchased")
      ),

      status: deriveStockStatus(
        quantity,
        minimumStock
      ),

      notes: optionalText(
        formData.get("notes")
      ),

      created_by: user.id,
      updated_by: user.id,
    });

  if (error) {
    redirect(
      `/hub/inventory/consumables/new?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath("/hub/inventory");
  revalidatePath("/hub/inventory/consumables");

  redirect("/hub/inventory/consumables");
}

export async function updateConsumable(
  consumableId: string,
  formData: FormData
) {
  const { supabase, user } = await requireManager();

  const name = String(
    formData.get("name") ?? ""
  ).trim();

  if (!name) {
    redirect(
      `/hub/inventory/consumables/${consumableId}/edit?error=Consumable%20name%20is%20required.`
    );
  }

  const quantity = numberValue(
    formData.get("quantity")
  );

  const minimumStock = numberValue(
    formData.get("minimum_stock")
  );

  const reorderQuantity = numberValue(
    formData.get("reorder_quantity")
  );

  const { data: current } = await supabase
    .from("consumables")
    .select("status")
    .eq("id", consumableId)
    .single();

  const status =
    current?.status === "Archived"
      ? "Archived"
      : deriveStockStatus(
          quantity,
          minimumStock
        );

  const { error } = await supabase
    .from("consumables")
    .update({
      name,

      category: optionalText(
        formData.get("category")
      ),

      supplier: optionalText(
        formData.get("supplier")
      ),

      catalog_number: optionalText(
        formData.get("catalog_number")
      ),

      quantity,

      unit:
        optionalText(formData.get("unit")) ??
        "unit",

      minimum_stock: minimumStock,

      reorder_quantity: reorderQuantity,

      location: optionalText(
        formData.get("location")
      ),

      project: optionalText(
        formData.get("project")
      ),

      last_purchased: optionalDate(
        formData.get("last_purchased")
      ),

      status,

      notes: optionalText(
        formData.get("notes")
      ),

      updated_by: user.id,
    })
    .eq("id", consumableId);

  if (error) {
    redirect(
      `/hub/inventory/consumables/${consumableId}/edit?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath("/hub/inventory");
  revalidatePath("/hub/inventory/consumables");

  redirect("/hub/inventory/consumables");
}

export async function adjustConsumableStock(
  consumableId: string,
  formData: FormData
) {
  const { supabase, user } = await requireManager();

  const amount = numberValue(
    formData.get("amount")
  );

  const operation = String(
    formData.get("operation") ?? ""
  );

  const { data: consumable, error: readError } =
    await supabase
      .from("consumables")
      .select(
        "quantity, minimum_stock, status"
      )
      .eq("id", consumableId)
      .single();

  if (readError || !consumable) {
    redirect(
      `/hub/inventory/consumables/${consumableId}/stock?error=Consumable%20record%20not%20found.`
    );
  }

  let nextQuantity = Number(
    consumable.quantity
  );

  if (operation === "receive") {
    nextQuantity += amount;
  } else if (operation === "use") {
    nextQuantity -= amount;
  } else if (operation === "set") {
    nextQuantity = amount;
  }

  nextQuantity = Math.max(
    0,
    nextQuantity
  );

  const nextStatus =
    consumable.status === "Archived"
      ? "Archived"
      : deriveStockStatus(
          nextQuantity,
          Number(consumable.minimum_stock)
        );

  const { error } = await supabase
    .from("consumables")
    .update({
      quantity: nextQuantity,
      status: nextStatus,
      updated_by: user.id,
    })
    .eq("id", consumableId);

  if (error) {
    redirect(
      `/hub/inventory/consumables/${consumableId}/stock?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath("/hub/inventory");
  revalidatePath("/hub/inventory/consumables");

  redirect("/hub/inventory/consumables");
}

export async function archiveConsumable(
  consumableId: string
) {
  const { supabase, user } = await requireManager();

  const { error } = await supabase
    .from("consumables")
    .update({
      status: "Archived",
      updated_by: user.id,
    })
    .eq("id", consumableId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/hub/inventory");
  revalidatePath("/hub/inventory/consumables");
}