"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import {
  createClient,
} from "../../../../lib/supabase/server";

import {
  getHubUser,
} from "../../../../lib/hub/auth";

/* ============================================================
   TYPES / PERMISSIONS
============================================================ */

function canManageMaster(
  role: string
) {
  return (
    role === "admin" ||
    role === "lab_manager"
  );
}

function canContributeInventory(
  role: string
) {
  return [
    "admin",
    "lab_manager",
    "student",
    "member",
  ].includes(role);
}

/* ============================================================
   HELPERS
============================================================ */

function optionalText(
  value:
    | FormDataEntryValue
    | null
) {
  const text =
    String(
      value ?? ""
    ).trim();

  return (
    text ||
    null
  );
}

function numberValue(
  value:
    | FormDataEntryValue
    | null,
  fallback = 0
) {
  const parsed =
    Number(value);

  if (
    Number.isNaN(
      parsed
    )
  ) {
    return fallback;
  }

  return Math.max(
    0,
    parsed
  );
}

function deriveStockStatus(
  quantity: number,
  minimumStock: number
) {
  if (
    quantity <= 0
  ) {
    return "Out of Stock";
  }

  if (
    minimumStock >
      0 &&
    quantity <=
      minimumStock
  ) {
    return "Low Stock";
  }

  return "In Stock";
}

async function inventoryContext() {
  const context =
    await getHubUser();

  const supabase =
    await createClient();

  return {
    context,
    supabase,
  };
}

function refreshConsumables() {
  revalidatePath(
    "/hub"
  );

  revalidatePath(
    "/hub/inventory"
  );

  revalidatePath(
    "/hub/inventory/consumables"
  );
}

/* ============================================================
   ADD CONSUMABLE
============================================================ */

export async function addConsumable(
  formData: FormData
) {
  const {
    context,
    supabase,
  } =
    await inventoryContext();

  const role =
    context.profile.role;

  if (
    !canContributeInventory(
      role
    )
  ) {
    throw new Error(
      "You do not have permission to add consumables."
    );
  }

  const name =
    String(
      formData.get(
        "name"
      ) ?? ""
    ).trim();

  if (!name) {
    redirect(
      "/hub/inventory/consumables/new?error=Consumable%20name%20is%20required."
    );
  }

  const quantity =
    numberValue(
      formData.get(
        "quantity"
      )
    );

  const manager =
    canManageMaster(
      role
    );

  /*
   * Students/members can add a basic record.
   * Minimum stock and master information
   * remain under Admin/Lab Manager control.
   */
  const minimumStock =
    manager
      ? numberValue(
          formData.get(
            "minimum_stock"
          )
        )
      : 0;

  const {
    error,
  } =
    await supabase
      .from(
        "consumables"
      )
      .insert({
        name,

        category:
          manager
            ? optionalText(
                formData.get(
                  "category"
                )
              )
            : null,

        supplier:
          manager
            ? optionalText(
                formData.get(
                  "supplier"
                )
              )
            : null,

        catalog_number:
          manager
            ? optionalText(
                formData.get(
                  "catalog_number"
                )
              )
            : null,

        quantity,

        unit:
          optionalText(
            formData.get(
              "unit"
            )
          ) ??
          "unit",

        minimum_stock:
          minimumStock,

        reorder_quantity:
          0,

        location:
          optionalText(
            formData.get(
              "location"
            )
          ),

        notes:
          optionalText(
            formData.get(
              "notes"
            )
          ),

        status:
          deriveStockStatus(
            quantity,
            minimumStock
          ),

        created_by:
          context.userId,

        updated_by:
          context.userId,
      });

  if (error) {
    redirect(
      `/hub/inventory/consumables/new?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  refreshConsumables();

  redirect(
    "/hub/inventory/consumables"
  );
}

/* ============================================================
   UPDATE MASTER INFORMATION
   ADMIN / LAB MANAGER ONLY
============================================================ */

export async function updateConsumable(
  consumableId: string,
  formData: FormData
) {
  const {
    context,
    supabase,
  } =
    await inventoryContext();

  if (
    !canManageMaster(
      context.profile.role
    )
  ) {
    throw new Error(
      "Only an administrator or lab manager can edit consumable master information."
    );
  }

  const name =
    String(
      formData.get(
        "name"
      ) ?? ""
    ).trim();

  if (!name) {
    redirect(
      `/hub/inventory/consumables/${consumableId}/edit?error=Consumable%20name%20is%20required.`
    );
  }

  const quantity =
    numberValue(
      formData.get(
        "quantity"
      )
    );

  const minimumStock =
    numberValue(
      formData.get(
        "minimum_stock"
      )
    );

  const {
    data: current,
  } =
    await supabase
      .from(
        "consumables"
      )
      .select(
        "status"
      )
      .eq(
        "id",
        consumableId
      )
      .single();

  const status =
    current?.status ===
    "Archived"
      ? "Archived"
      : deriveStockStatus(
          quantity,
          minimumStock
        );

  const {
    error,
  } =
    await supabase
      .from(
        "consumables"
      )
      .update({
        name,

        category:
          optionalText(
            formData.get(
              "category"
            )
          ),

        supplier:
          optionalText(
            formData.get(
              "supplier"
            )
          ),

        catalog_number:
          optionalText(
            formData.get(
              "catalog_number"
            )
          ),

        quantity,

        unit:
          optionalText(
            formData.get(
              "unit"
            )
          ) ??
          "unit",

        minimum_stock:
          minimumStock,

        location:
          optionalText(
            formData.get(
              "location"
            )
          ),

        notes:
          optionalText(
            formData.get(
              "notes"
            )
          ),

        status,

        updated_by:
          context.userId,
      })
      .eq(
        "id",
        consumableId
      );

  if (error) {
    redirect(
      `/hub/inventory/consumables/${consumableId}/edit?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  refreshConsumables();

  redirect(
    "/hub/inventory/consumables"
  );
}

/* ============================================================
   SIMPLE DAY-TO-DAY UPDATE
   ADMIN / LAB MANAGER / STUDENT / MEMBER

   No transaction ledger:
   - quantity
   - location
   - notes
============================================================ */

export async function adjustConsumableStock(
  consumableId: string,
  formData: FormData
) {
  const {
    context,
    supabase,
  } =
    await inventoryContext();

  if (
    !canContributeInventory(
      context.profile.role
    )
  ) {
    throw new Error(
      "You do not have permission to update consumable stock."
    );
  }

  const {
    data: item,
    error:
      readError,
  } =
    await supabase
      .from(
        "consumables"
      )
      .select(
        `
        id,
        quantity,
        minimum_stock,
        status
        `
      )
      .eq(
        "id",
        consumableId
      )
      .single();

  if (
    readError ||
    !item
  ) {
    redirect(
      `/hub/inventory/consumables/${consumableId}/stock?error=Consumable%20record%20not%20found.`
    );
  }

  if (
    item.status ===
    "Archived"
  ) {
    redirect(
      "/hub/inventory/consumables"
    );
  }

  const quantity =
    numberValue(
      formData.get(
        "quantity"
      )
    );

  const minimumStock =
    Number(
      item.minimum_stock ??
        0
    );

  const status =
    deriveStockStatus(
      quantity,
      minimumStock
    );

  const {
    error,
  } =
    await supabase
      .from(
        "consumables"
      )
      .update({
        quantity,

        location:
          optionalText(
            formData.get(
              "location"
            )
          ),

        notes:
          optionalText(
            formData.get(
              "notes"
            )
          ),

        status,

        updated_by:
          context.userId,
      })
      .eq(
        "id",
        consumableId
      );

  if (error) {
    redirect(
      `/hub/inventory/consumables/${consumableId}/stock?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  refreshConsumables();

  redirect(
    "/hub/inventory/consumables"
  );
}

/* ============================================================
   ARCHIVE
   ADMIN / LAB MANAGER ONLY
============================================================ */

export async function archiveConsumable(
  consumableId: string
) {
  const {
    context,
    supabase,
  } =
    await inventoryContext();

  if (
    !canManageMaster(
      context.profile.role
    )
  ) {
    throw new Error(
      "Only an administrator or lab manager can archive consumables."
    );
  }

  const {
    error,
  } =
    await supabase
      .from(
        "consumables"
      )
      .update({
        status:
          "Archived",

        updated_by:
          context.userId,
      })
      .eq(
        "id",
        consumableId
      );

  if (error) {
    throw new Error(
      error.message
    );
  }

  refreshConsumables();
}