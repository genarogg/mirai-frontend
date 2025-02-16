import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"

interface VirtualTryOnModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  productImage: any
}

export default function VirtualTryOnModal({ isOpen, onClose, productName, productImage }: VirtualTryOnModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Prueba virtual: {productName}</DialogTitle>
          <DialogDescription>Usa tu cámara para ver cómo te queda esta prenda.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Image
              src={productImage || "/placeholder.svg"}
              alt={productName}
              width={200}
              height={200}
              className="rounded-md object-cover"
            />
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
        
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Nota: Esta es una simulación. En una aplicación real, aquí se integraría la funcionalidad de realidad
            aumentada para probar la prenda virtualmente.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

