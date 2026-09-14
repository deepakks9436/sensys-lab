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

export async function addChemical(formData: FormData) {
  const { supabase, user } = await requireManager();

  const name = String(
    formData.get("name") ?? ""
  ).trim();

  if (!name) {
    redirect(
      "/hub/inventory/chemicals/new?error=Chemical%20name%20is%20required."
    );
  }

  const quantity = numberValue(
    formData.get("quantity")
  );

  const minimumStock = numberValue(
    formData.get("minimum_stock")
  );

  const { error } = await supabase
    .from("chemicals")
    .insert({
      name,
      formula: optionalText(formData.get("formula")),
      cas_number: optionalText(
        formData.get("cas_number")
      ),
      grade: optionalText(formData.get("grade")),

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

      location: optionalText(
        formData.get("location")
      ),
      storage_condition: optionalText(
        formData.get("storage_condition")
      ),

      received_date: optionalDate(
        formData.get("received_date")
      ),
      opened_date: optionalDate(
        formData.get("opened_date")
      ),
      expiry_date: optionalDate(
        formData.get("expiry_date")
      ),

      hazard: optionalText(
        formData.get("hazard")
      ),
      sds_url: optionalText(
        formData.get("sds_url")
      ),

      project: optionalText(
        formData.get("project")
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
      `/hub/inventory/chemicals/new?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath("/hub/inventory");
  revalidatePath("/hub/inventory/chemicals");

  redirect("/hub/inventory/chemicals");
}

export async function updateChemical(
  chemicalId: string,
  formData: FormData
) {
  const { supabase, user } = await requireManager();

  const name = String(
    formData.get("name") ?? ""
  ).trim();

  if (!name) {
    redirect(
      `/hub/inventory/chemicals/${chemicalId}/edit?error=Chemical%20name%20is%20required.`
    );
  }

  const quantity = numberValue(
    formData.get("quantity")
  );

  const minimumStock = numberValue(
    formData.get("minimum_stock")
  );

  const { data: current } = await supabase
    .from("chemicals")
    .select("status")
    .eq("id", chemicalId)
    .single();

  const status =
    current?.status === "Archived"
      ? "Archived"
      : deriveStockStatus(
          quantity,
          minimumStock
        );

  const { error } = await supabase
    .from("chemicals")
    .update({
      name,
      formula: optionalText(formData.get("formula")),
      cas_number: optionalText(
        formData.get("cas_number")
      ),
      grade: optionalText(formData.get("grade")),

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

      location: optionalText(
        formData.get("location")
      ),
      storage_condition: optionalText(
        formData.get("storage_condition")
      ),

      received_date: optionalDate(
        formData.get("received_date")
      ),
      opened_date: optionalDate(
        formData.get("opened_date")
      ),
      expiry_date: optionalDate(
        formData.get("expiry_date")
      ),

      hazard: optionalText(
        formData.get("hazard")
      ),
      sds_url: optionalText(
        formData.get("sds_url")
      ),

      project: optionalText(
        formData.get("project")
      ),

      status,

      notes: optionalText(
        formData.get("notes")
      ),

      updated_by: user.id,
    })
    .eq("id", chemicalId);

  if (error) {
    redirect(
      `/hub/inventory/chemicals/${chemicalId}/edit?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath("/hub/inventory");
  revalidatePath("/hub/inventory/chemicals");

  redirect("/hub/inventory/chemicals");
}

export async function adjustChemicalStock(
  chemicalId: string,
  formData: FormData
) {
  const { supabase, user } = await requireManager();

  const amount = numberValue(
    formData.get("amount")
  );

  const operation = String(
    formData.get("operation") ?? ""
  );

  const { data: chemical, error: readError } =
    await supabase
      .from("chemicals")
      .select(
        "quantity, minimum_stock, status"
      )
      .eq("id", chemicalId)
      .single();

  if (readError || !chemical) {
    redirect(
      `/hub/inventory/chemicals/${chemicalId}/stock?error=Chemical%20record%20not%20found.`
    );
  }

  let nextQuantity = Number(
    chemical.quantity
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
    chemical.status === "Archived"
      ? "Archived"
      : deriveStockStatus(
          nextQuantity,
          Number(chemical.minimum_stock)
        );

  const { error } = await supabase
    .from("chemicals")
    .update({
      quantity: nextQuantity,
      status: nextStatus,
      updated_by: user.id,
    })
    .eq("id", chemicalId);

  if (error) {
    redirect(
      `/hub/inventory/chemicals/${chemicalId}/stock?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath("/hub/inventory");
  revalidatePath("/hub/inventory/chemicals");

  redirect("/hub/inventory/chemicals");
}

export async function archiveChemical(
  chemicalId: string
) {
  const { supabase, user } = await requireManager();

  const { error } = await supabase
    .from("chemicals")
    .update({
      status: "Archived",
      updated_by: user.id,
    })
    .eq("id", chemicalId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/hub/inventory");
  revalidatePath("/hub/inventory/chemicals");
}