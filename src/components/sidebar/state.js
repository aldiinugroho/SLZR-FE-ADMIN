import { create } from 'zustand'

const storeSideBar = create((set) => ({
    selectedpage: "/",
    setselectedpage: (params = "/") => {
        set({
            selectedpage: params
        })
    }
}))

export {
    storeSideBar
}
