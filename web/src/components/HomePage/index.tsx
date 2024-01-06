import { UsersContainer } from "../Users/UsersContainer"
import { useUsersAPI } from "@/services/user"

export async function HomePage() {
  const { getUsers } = useUsersAPI()

  const data = await getUsers().catch((err) => err)

  return (
    <>
      {!data && <p>Carregando...</p>}

      {data && <UsersContainer users={data} />}
    </>
  )
}