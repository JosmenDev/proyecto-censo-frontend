import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import FormReligion from "../../components/Forms/Person/FormReligion"
import DataTableReligion from "../../components/Tables/Person/DataTableReligion"

const Religion = () => {
    return (
        <>
            <Breadcrumb pageName="Religión" parentPage="Requermientos / Req. Personas / "/>
            <div className="grid grid-cols-6 gap-9 sm:grid-cols-6 mx-auto">
                {/* Div para el registro */}
                <div className="col-span-6 xl:col-span-2">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Registro
                            </h3>
                        </div>
                        <FormReligion/>
                    </div>
                </div>
                {/* Div para el listado */}
                <div className="col-span-6 xl:col-span-4">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Listado
                            </h3>
                        </div>
                            <DataTableReligion />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Religion