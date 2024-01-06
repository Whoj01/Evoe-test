import Image from "next/image"

export const Header = () => {
  return (
    <header className="flex items-center justify-start bg-white py-10 max-w-[1237px] w-full  max-h-full">
      <Image src="/evoe_logo.svg" alt="logo" width={150} height={50} />
    </header>
  )
}