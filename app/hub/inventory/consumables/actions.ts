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
   PERMISSIONS
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
    minimumStock > 0 &&
    quantity <= minimumStock
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

function refreshConsumables(
  consumableId?: string
) {
  revalidatePath(
    "/hub"
  );

  revalidatePath(
    "/hub/inventory"
  );

  revalidatePath(
    "/hub/inventory/consumables"
  );

  if (consumableId) {
    revalidatePath(
      `/hub/inventory/consumables/${consumableId}`
    );

    revalidatePath(
      `/hub/inventory/consumables/${consumableId}/edit`
    );

    revalidatePath(
      `/hub/inventory/consumables/${consumableId}/stock`
    );
  }
}

/* ============================================================
   ADD CONSUMABLE
   ADMIN / LAB MANAGER ONLY
============================================================ */

export async function addConsumable(
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
      "Only an administrator or lab manager can add consumables."
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

  const minimumStock =
    numberValue(
      formData.get(
        "minimum_stock"
      )
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
      .insert({
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

        reorder_quantity:
          numberValue(
            formData.get(
              "reorder_quantity"
            )
          ),

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
   UPDATE CONSUMABLE MASTER INFORMATION
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
    error: currentError,
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

  if (
    currentError ||
    !current
  ) {
    redirect(
      `/hub/inventory/consumables/${consumableId}/edit?error=Consumable%20record%20not%20found.`
    );
  }

  const status =
    current.status ===
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

        reorder_quantity:
          numberValue(
            formData.get(
              "reorder_quantity"
            )
          ),

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

  refreshConsumables(
    consumableId
  );

  redirect(
    "/hub/inventory/consumables"
  );
}

/* ============================================================
   DAY-TO-DAY STOCK UPDATE

   ALLOWED:
   - ADMIN
   - LAB MANAGER
   - STUDENT
   - MEMBER

   IMPORTANT:

   Ordinary lab members may change STOCK QUANTITY only.

   They cannot use this action to change:
   - name
   - category
   - supplier
   - catalog number
   - unit
   - minimum stock
   - reorder quantity
   - location
   - notes

   Stock changes are handled by:

   public.adjust_consumable_stock(
     uuid,
     text,
     numeric
   )

   Supported forms:

   1. quantity = physical quantity remaining

   OR

   2. operation = receive / use / set
      amount = numeric
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

  /* ----------------------------------------------------------
     Confirm record exists
  ---------------------------------------------------------- */

  const {
    data: item,
    error: readError,
  } =
    await supabase
      .from(
        "consumables"
      )
      .select(
        `
        id,
        name,
        quantity,
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
      `/hub/inventory/consumables/${consumableId}/stock?error=Archived%20consumables%20cannot%20be%20updated.`
    );
  }

  /* ----------------------------------------------------------
     Determine operation
  ---------------------------------------------------------- */

  const directQuantity =
    formData.get(
      "quantity"
    );

  let operation =
    String(
      formData.get(
        "operation"
      ) ?? ""
    )
      .trim()
      .toLowerCase();

  let amount =
    numberValue(
      formData.get(
        "amount"
      )
    );

  /*
   * Current stock page may simply submit:
   *
   * quantity = 3
   *
   * Interpret that as:
   *
   * set stock to 3
   */
  if (
    directQuantity !==
      null &&
    String(
      directQuantity
    ).trim() !==
      ""
  ) {
    operation =
      "set";

    amount =
      numberValue(
        directQuantity
      );
  }

  if (
    ![
      "receive",
      "use",
      "set",
    ].includes(
      operation
    )
  ) {
    redirect(
      `/hub/inventory/consumables/${consumableId}/stock?error=Please%20select%20a%20valid%20stock%20operation.`
    );
  }

  if (
    operation !== "set" &&
    amount <= 0
  ) {
    redirect(
      `/hub/inventory/consumables/${consumableId}/stock?error=Stock%20amount%20must%20be%20greater%20than%20zero.`
    );
  }

  /* ----------------------------------------------------------
     Protected RPC
  ---------------------------------------------------------- */

  const {
    error,
  } =
    await supabase.rpc(
      "adjust_consumable_stock",
      {
        p_consumable_id:
          consumableId,

        p_operation:
          operation,

        p_amount:
          amount,
      }
    );

  if (error) {
    redirect(
      `/hub/inventory/consumables/${consumableId}/stock?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  refreshConsumables(
    consumableId
  );

  redirect(
    "/hub/inventory/consumables"
  );
}

/* ============================================================
   ARCHIVE CONSUMABLE
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

  refreshConsumables(
    consumableId
  );

  redirect(
    "/hub/inventory/consumables"
  );
}