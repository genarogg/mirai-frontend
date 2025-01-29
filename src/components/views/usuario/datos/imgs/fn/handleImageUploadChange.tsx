
import { notify } from "@nano";

const handleImageUpload = async (state: any, router: any) => {

    const token = localStorage.getItem("token");

    if (!state.file) {
        notify({
            type: "warning",
            message: "Debes de cargar una imagen",
        });
    }

    const formData = new FormData();


    if (state.file) {
        formData.append("file", state.file);
    }

    try {
        const response = await fetch("http://localhost:4000/ia/change", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }

        const data = await response.json();

        notify({
            type: data.type,
            message: data.message,
        });

        if(localStorage.getItem("primeraVez") === "primeraVez") {
            router.push("/usuario/datos/personales");
            return;
        }

        router.push("/usuario");

    } catch (error) {
        console.error("Error:", error);
    }
};

export default handleImageUpload;