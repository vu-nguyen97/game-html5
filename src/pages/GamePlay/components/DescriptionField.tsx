import React from "react";

type Props = {
  fieldName: string;
  contentEl: React.ReactNode;
  classNames?: string;
  show?: boolean;
  showContent?: boolean;
};

const DescriptionField = ({
  classNames = "mt-2 sm:mt-1",
  fieldName,
  contentEl,
  show = true,
  showContent = true,
}: Props) => {
  if (!show) return <></>;

  return (
    <div className={`grid grid-cols-12 gap-x-3 ${classNames}`}>
      <div className="col-span-4 text-sm font-semibold">{fieldName}</div>
      {showContent && (
        <div className="col-span-8 flex flex-wrap text-sm">{contentEl}</div>
      )}
    </div>
  );
};

export default DescriptionField;
