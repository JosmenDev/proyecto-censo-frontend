import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import FormParentesco from "../../components/Forms/Person/FormParentesco"
import DataTableParentesco from "../../components/Tables/Person/DataTableParentesco"

const Parentesco = () => {
    return (
        <>
            <Breadcrumb pageName="Parentesco" parentPage="Requermientos / Req. Personas / "/>
            <div className="grid grid-cols-6 gap-9 sm:grid-cols-6 mx-auto">
                {/* Div para el registro */}
                <div className="col-span-6 xl:col-span-2">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Registro
                            </h3>
                        </div>
                        <FormParentesco/>
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
                            <DataTableParentesco />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Parentesco