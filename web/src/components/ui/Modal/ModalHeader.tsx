export const ModalHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-start gap-3 w-full">
      {children}
    </div>
  )
}