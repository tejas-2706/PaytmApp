import { Button } from "./button";


interface Appbarprops {
    user?:{name?:string | null},
    onSignin:()=>void;
    onSignout:()=>void;
}

export const Appbar = ({user,onSignin,onSignout}:Appbarprops) => {
    return <div className="flex justify-between p-4 border-b-2 border-slate-300  px-10 shadow-sm">
        <div className="text-3xl font-bold">
            Paytm
        </div>
        <div>
            <Button onClick={user? onSignout:onSignin} >{user? "Logout":"Login"}</Button>
        </div>
    </div>
}