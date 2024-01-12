import router from "next/router"
import { UsersContainer } from "../Users/UsersContainer"
import { useUsersAPI } from "@/services/user"
import { Button } from "../ui/button"

export async function HomePage() {
  const { getUsers } = useUsersAPI()

  const data = await getUsers().catch((err) => null)

  return (
    <>
      {!data && (
        <div className="flex flex-col items-center justify-start w-full h-full gap-1 max-w-[300px]">
          <h1 className="text-3xl font-roboto font-bold text-title">Ops, parece que aconteceu um erro nesta página...</h1>
          <p className="font-nunitoSans text-black-900 text-lg">Parece que aconteceu um erro...</p>
        </div>
      )}

      {data && <UsersContainer users={data} />}
    </>
  )
}