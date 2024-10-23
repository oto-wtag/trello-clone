import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const NewBoardEntryColorSelector = ({
  colors,
  pictures,
  setFormValues,
  formValues,
}) => {
  return (
    <div className="py-1 space-y-4">
      <h1 className="mb-1 text-center font-bold text-sm">Board background</h1>
      <Separator />
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm">Photos</h4>
            <Button variant="secondary" className={cn("px-3 text-sm")}>
              See more
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {pictures.map((picture, index) => (
              <div
                key={index}
                className={`w-full h-[50px] rounded-sm cursor-pointer tarnsition-all hover:opacity-70 flex items-center justify-center ${
                  formValues.backgroundImage === `url('${picture}')`
                    ? "opacity-70"
                    : "opacity-100"
                }`}
                style={{
                  background: `url("${picture}") center / cover`,
                }}
                onClick={() =>
                  setFormValues((prev) => ({
                    ...prev,
                    backgroundImage: `url('${picture}')`,
                  }))
                }
              >
                <Check
                  className={`h-6 w-6 ${
                    formValues.backgroundImage === `url('${picture}')`
                      ? "inline-block"
                      : "hidden"
                  } `}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm">Colors</h4>
            <Button variant="secondary" className={cn("px-3 text-sm")}>
              See more
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`w-full h-[50px] rounded-sm cursor-pointer transition-all hover:opacity-70 flex items-center justify-center ${
                  color === formValues.backgroundImage
                    ? "opacity-70"
                    : "opacity-100"
                }`}
                style={{ background: color }}
                onClick={() =>
                  setFormValues((prev) => ({
                    ...prev,
                    backgroundImage: color,
                  }))
                }
              >
                <Check
                  className={`h-6 w-6 ${
                    color === formValues.backgroundImage
                      ? "inline-block"
                      : "hidden"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBoardEntryColorSelector;
