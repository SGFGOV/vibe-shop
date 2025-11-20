"use client";

import { Attribute, ProductVariant } from "@/types";

interface VariantListProps {
  att: string;
  option?: "Dropdown" | "Radio" | "Checkbox";
  variants?: ProductVariant[];
  setValue: (value: string) => void;
  varTitle: Attribute[];
  selectVariant: Record<string, unknown>;
  setSelectVariant: (variant: Record<string, unknown>) => void;
  setSelectVa: (va: Record<string, unknown>) => void;
}

interface AttributeVariant {
  _id?: string;
  name?: string;
  [key: string]: unknown;
}

const VariantList = ({
  att,
  option,
  variants,
  setValue,
  varTitle,
  selectVariant,
  setSelectVariant,
  setSelectVa,
}: VariantListProps) => {
  const handleChangeVariant = (v: string) => {
    setValue(v);
    setSelectVariant({
      ...selectVariant,
      [att]: v,
    });
    setSelectVa({ [att]: v });
  };

  const uniqueVariants = Array.from(
    new Map(
      (variants as ProductVariant[])?.map((v) => [v[att as keyof ProductVariant], v] as [unknown, ProductVariant]).filter((item): item is [unknown, ProductVariant] => Boolean(item[0]))
    ).values()
  ).filter(Boolean) as ProductVariant[];

  return (
    <>
      {option === "Dropdown" ? (
        <select
          onChange={(e) => handleChangeVariant(e.target.value)}
          className="form-select w-50 px-2 py-1 form-control"
          name="parent"
        >
          {uniqueVariants
            .filter((vl) =>
              Object?.values(selectVariant).includes(vl[att as keyof ProductVariant])
            )
            .map((vl, i) =>
              varTitle.map((vr) =>
                (vr?.variants as AttributeVariant[])?.map(
                  (el) =>
                    vr?._id === att &&
                    el?._id === vl[att as keyof ProductVariant] && (
                      <option
                        key={i + 1}
                        value={selectVariant[att] as string}
                        defaultValue={selectVariant[att] as string}
                        hidden
                      >
                        {el.name}
                      </option>
                    )
                )
              )
            )}

          {uniqueVariants.map((vl, i) =>
            varTitle.map((vr) =>
              (vr?.variants as AttributeVariant[])?.map(
                (el) =>
                  vr?._id === att &&
                  el?._id === vl[att as keyof ProductVariant] && (
                    <option key={el._id} value={vl[att as keyof ProductVariant] as string}>
                      {el.name}
                    </option>
                  )
              )
            )
          )}
        </select>
      ) : (
        <div className="d-flex align-items-center">
          {uniqueVariants.map((vl, i) =>
            varTitle.map((vr) =>
              (vr?.variants as AttributeVariant[])?.map(
                (el) =>
                  vr?._id === att &&
                  el?._id === vl[att as keyof ProductVariant] && (
                    <button
                      onClick={(e) => handleChangeVariant(vl[att as keyof ProductVariant] as string)}
                      key={i + 1}
                      className={`${
                        Object?.values(selectVariant).includes(vl[att as keyof ProductVariant])
                          ? "btn btn-success text-white mr-2 mb-2 rounded-pill px-3 py-1 btn-sm"
                          : "btn !bg-slate-100 text-dark mr-2 mb-2 rounded-pill px-3 py-1 btn-sm"
                      }`}
                    >
                      {el.name}
                    </button>
                  )
              )
            )
          )}
        </div>
      )}
    </>
  );
};

export default VariantList;

