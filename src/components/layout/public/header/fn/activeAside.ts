import { $ } from "@fn/index"

const activeAside = (id: string) => {
    const asideSearch = $("asideSearch")
    const btnSearch = $('btnSearch')
    const asideCategoria = $("asideCategoria")

    if (id === 'asideSearch') {
        asideSearch?.classList.toggle('active')
        btnSearch?.classList.toggle('active')

        asideCategoria?.classList.remove('active')

        return
    }

    if (id === 'asideCategoria') {
        asideCategoria?.classList.toggle('active')

        asideSearch?.classList.remove('active')
        btnSearch?.classList.remove('active')

        return
    }

    throw new Error('id not found')

}

export default activeAside