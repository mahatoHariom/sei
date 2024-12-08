"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface ModalFooterProps {
  closeHandler: () => void;
  onSubmit: () => void;
  isValid?: boolean;
  loading?: boolean;
}

export const ModalFooter = ({
  closeHandler,
  onSubmit,
  isValid,
  loading,
}: ModalFooterProps) => {
  return (
    <DialogFooter className="flex justify-end gap-2 mt-4">
      <Button type="button" onClick={closeHandler} variant={"destructive"}>
        Cancel
      </Button>

      <Button
        type="button"
        onClick={onSubmit}
        disabled={!isValid}
        loading={loading}
      >
        Submit
      </Button>
    </DialogFooter>
  );
};
