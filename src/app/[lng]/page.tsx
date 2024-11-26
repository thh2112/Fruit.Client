import { clientSetting } from "@/routes"
import { redirect } from "next/navigation"

const page = () => {
  redirect(clientSetting.homePage())
}

export default page
