import { XCircleIcon } from "lucide-react"

interface ModalRootProps {
  closeModal: () => void
  children: React.ReactNode
}

export const ModalRoot = ({ closeModal, children }: ModalRootProps) => {
  return (
    <div className="fixed inset-0 bg-black-900/40 flex  items-center justify-center z-40 px-3">
      <div className="relative flex flex-col max-w-[640px] w-full max-h-[540px] bg-white rounded-xl gap-4 shadow-md  px-5 py-5">
        <XCircleIcon size={16} className="text-black-900 absolute top-4 right-4 z-20 cursor-pointer hover:brightness-75 hover:-translate-y-[1px] transition-all" onClick={closeModal} />

        {children}
      </div>
    </div>
  )
}