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

function optionalDate(
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
    Number.isNaN(parsed)
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

function refreshChemicals(
  chemicalId?: string
) {
  revalidatePath(
    "/hub"
  );

  revalidatePath(
    "/hub/inventory"
  );

  revalidatePath(
    "/hub/inventory/chemicals"
  );

  if (chemicalId) {
    revalidatePath(
      `/hub/inventory/chemicals/${chemicalId}`
    );

    revalidatePath(
      `/hub/inventory/chemicals/${chemicalId}/edit`
    );

    revalidatePath(
      `/hub/inventory/chemicals/${chemicalId}/stock`
    );
  }
}

/* ============================================================
   ADD CHEMICAL
   ADMIN / LAB MANAGER ONLY
============================================================ */

export async function addChemical(
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
      "Only an administrator or lab manager can add chemicals."
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
      "/hub/inventory/chemicals/new?error=Chemical%20name%20is%20required."
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
        "chemicals"
      )
      .insert({
        name,

        formula:
          optionalText(
            formData.get(
              "formula"
            )
          ),

        cas_number:
          optionalText(
            formData.get(
              "cas_number"
            )
          ),

        grade:
          optionalText(
            formData.get(
              "grade"
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

        storage_condition:
          optionalText(
            formData.get(
              "storage_condition"
            )
          ),

        received_date:
          optionalDate(
            formData.get(
              "received_date"
            )
          ),

        opened_date:
          optionalDate(
            formData.get(
              "opened_date"
            )
          ),

        expiry_date:
          optionalDate(
            formData.get(
              "expiry_date"
            )
          ),

        hazard:
          optionalText(
            formData.get(
              "hazard"
            )
          ),

        sds_url:
          optionalText(
            formData.get(
              "sds_url"
            )
          ),

        project:
          optionalText(
            formData.get(
              "project"
            )
          ),

        status,

        notes:
          optionalText(
            formData.get(
              "notes"
            )
          ),

        created_by:
          context.userId,

        updated_by:
          context.userId,
      });

  if (error) {
    redirect(
      `/hub/inventory/chemicals/new?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  refreshChemicals();

  redirect(
    "/hub/inventory/chemicals"
  );
}

/* ============================================================
   UPDATE CHEMICAL MASTER INFORMATION
   ADMIN / LAB MANAGER ONLY
============================================================ */

export async function updateChemical(
  chemicalId: string,
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
      "Only an administrator or lab manager can edit chemical master information."
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
      `/hub/inventory/chemicals/${chemicalId}/edit?error=Chemical%20name%20is%20required.`
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
        "chemicals"
      )
      .select(
        "status"
      )
      .eq(
        "id",
        chemicalId
      )
      .single();

  if (
    currentError ||
    !current
  ) {
    redirect(
      `/hub/inventory/chemicals/${chemicalId}/edit?error=Chemical%20record%20not%20found.`
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
        "chemicals"
      )
      .update({
        name,

        formula:
          optionalText(
            formData.get(
              "formula"
            )
          ),

        cas_number:
          optionalText(
            formData.get(
              "cas_number"
            )
          ),

        grade:
          optionalText(
            formData.get(
              "grade"
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

        storage_condition:
          optionalText(
            formData.get(
              "storage_condition"
            )
          ),

        received_date:
          optionalDate(
            formData.get(
              "received_date"
            )
          ),

        opened_date:
          optionalDate(
            formData.get(
              "opened_date"
            )
          ),

        expiry_date:
          optionalDate(
            formData.get(
              "expiry_date"
            )
          ),

        hazard:
          optionalText(
            formData.get(
              "hazard"
            )
          ),

        sds_url:
          optionalText(
            formData.get(
              "sds_url"
            )
          ),

        project:
          optionalText(
            formData.get(
              "project"
            )
          ),

        status,

        notes:
          optionalText(
            formData.get(
              "notes"
            )
          ),

        updated_by:
          context.userId,
      })
      .eq(
        "id",
        chemicalId
      );

  if (error) {
    redirect(
      `/hub/inventory/chemicals/${chemicalId}/edit?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  refreshChemicals(
    chemicalId
  );

  redirect(
    `/hub/inventory/chemicals/${chemicalId}`
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
   This action DOES NOT directly update the chemicals table.

   All stock changes are routed through:

   public.adjust_chemical_stock(
     uuid,
     text,
     numeric
   )

   This prevents ordinary users from changing:
   - chemical name
   - formula
   - CAS number
   - supplier
   - location
   - notes
   - minimum stock
   - hazard information
   - other master information

   The database function is responsible for safely updating:
   - quantity
   - stock status
   - updated_by / audit information

   Supported form styles:

   A. Existing stock form:
      operation = receive / use / set
      amount = number

   B. Simple physical-count form:
      quantity = actual amount remaining

      This is automatically converted into:
      operation = set
      amount = quantity
============================================================ */

export async function adjustChemicalStock(
  chemicalId: string,
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
      "You do not have permission to update chemical stock."
    );
  }

  /*
   * First confirm that the chemical exists.
   *
   * We only read the record here.
   * We do NOT update the table directly.
   */
  const {
    data: chemical,
    error: readError,
  } =
    await supabase
      .from(
        "chemicals"
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
        chemicalId
      )
      .single();

  if (
    readError ||
    !chemical
  ) {
    redirect(
      `/hub/inventory/chemicals/${chemicalId}/stock?error=Chemical%20record%20not%20found.`
    );
  }

  if (
    chemical.status ===
    "Archived"
  ) {
    redirect(
      `/hub/inventory/chemicals/${chemicalId}/stock?error=Archived%20chemicals%20cannot%20be%20updated.`
    );
  }

  /*
   * ----------------------------------------------------------
   * DETERMINE STOCK OPERATION
   * ----------------------------------------------------------
   *
   * If "quantity" exists, the user is reporting the actual
   * physical amount remaining.
   *
   * Example:
   *
   * Current database stock = 7
   * User physically sees = 3
   *
   * quantity = 3
   *
   * becomes:
   *
   * operation = "set"
   * amount = 3
   */

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

  /*
   * Only permit the three stock operations supported by
   * the protected database RPC.
   */
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
      `/hub/inventory/chemicals/${chemicalId}/stock?error=Please%20select%20a%20valid%20stock%20operation.`
    );
  }

  /*
   * For receive/use operations, zero does not represent
   * a meaningful stock movement.
   *
   * For "set", zero IS valid because a user may be
   * reporting that the chemical is completely depleted.
   */
  if (
    operation !== "set" &&
    amount <= 0
  ) {
    redirect(
      `/hub/inventory/chemicals/${chemicalId}/stock?error=Stock%20amount%20must%20be%20greater%20than%20zero.`
    );
  }

  /*
   * ----------------------------------------------------------
   * PROTECTED DATABASE UPDATE
   * ----------------------------------------------------------
   *
   * This is the important change.
   *
   * Students/members no longer perform:
   *
   * supabase
   *   .from("chemicals")
   *   .update(...)
   *
   * Instead, PostgreSQL performs the controlled operation.
   */

  const {
    error,
  } =
    await supabase.rpc(
      "adjust_chemical_stock",
      {
        p_chemical_id:
          chemicalId,

        p_operation:
          operation,

        p_amount:
          amount,
      }
    );

  if (error) {
    redirect(
      `/hub/inventory/chemicals/${chemicalId}/stock?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  refreshChemicals(
    chemicalId
  );

  redirect(
    `/hub/inventory/chemicals/${chemicalId}`
  );
}

/* ============================================================
   ARCHIVE CHEMICAL
   ADMIN / LAB MANAGER ONLY
============================================================ */

export async function archiveChemical(
  chemicalId: string
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
      "Only an administrator or lab manager can archive chemicals."
    );
  }

  const {
    error,
  } =
    await supabase
      .from(
        "chemicals"
      )
      .update({
        status:
          "Archived",

        updated_by:
          context.userId,
      })
      .eq(
        "id",
        chemicalId
      );

  if (error) {
    throw new Error(
      error.message
    );
  }

  refreshChemicals(
    chemicalId
  );

  redirect(
    "/hub/inventory/chemicals"
  );
}