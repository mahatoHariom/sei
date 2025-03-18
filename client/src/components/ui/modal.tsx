"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showCancel?: boolean;
  showConfirm?: boolean;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  isConfirmLoading?: boolean;
  variant?: "default" | "destructive";
  className?: string;
  contentClassName?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  showCancel = false,
  showConfirm = false,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
  isConfirmLoading = false,
  variant = "default",
  className,
  contentClassName,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn("sm:max-w-[500px] overflow-hidden", contentClassName)}
      >
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        <div className={cn("py-4", className)}>{children}</div>

        {(showCancel || showConfirm || footer) && (
          <DialogFooter className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-end sm:space-x-2">
            {footer || (
              <>
                {showCancel && (
                  <Button variant="outline" onClick={onClose}>
                    {cancelText}
                  </Button>
                )}
                {showConfirm && (
                  <Button
                    variant={variant}
                    onClick={onConfirm}
                    disabled={isConfirmLoading}
                  >
                    {isConfirmLoading ? "Loading..." : confirmText}
                  </Button>
                )}
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
