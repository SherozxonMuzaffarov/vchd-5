<template>
    <main>
        <h3>Журнал</h3>
        <h4>монтаж букс с роликовыми подшипниками </h4>

        
        <!-- Modal create -->
        <BModal
            class="modal-xl"
            v-model="modalCreate"
            @ok.prevent="handleOk"
            @keyup.enter="handleOk"
            @cancel="modalCreate = !modalCreate"
            cancelTitle="Chiqish"
            okTitle="Saqlash"
            >
            <div class="row">
                <div class="col-4">
                    <label for="vu53_register_number" class="form-label">Номер колесной пары vu-53</label>
                    <BFormSelect v-model="formData.vu53_register_number" :options="vu53s" id="vu53_register_number" class="mb-3">
                        <template #first>
                        <BFormSelectOption :value="null" disabled >-- vagon turi --</BFormSelectOption >
                        </template>
                    </BFormSelect> 
                </div>
                <div class="col-4">
                    <label for="nomer" class="form-label">№ по порядку</label>
                    <BFormInput v-model="formData.register_number" id="nomer" class="mb-3" />
                </div>
                <div class="col-4">
                    <label for="year" class="form-label">Дата монтажа </label>
                    <BFormInput v-model="formData.register_time" id="year" />
                </div>
                <div class="col-6">
                    <label for="vu53_number" class="form-label">Номер плавки и номер колесной пары</label>
                    <BFormInput v-model="formData.vu53_number" id="vu53_number" disabled/>
                </div>
                <div class="col-6">
                    <label for="stamps" class="form-label">Клейма полных освидетельствований колесной пары</label>
                    <BFormInput v-model="formData.stamps" id="stamps" disabled/>
                </div>

                <div><hr></div>

                <h4 class="mt-5">Диаметры шейка оси в мм</h4>
                <label class="form-label">правая</label>
                <div class="col-2">
                    <label for="diameter_sheyka_right_d1" class="form-label">d1</label>
                    <BFormInput v-model="formData.diameter_sheyka_right_d1" id="diameter_sheyka_right_d1"/>
                </div>
                <div class="col-2">
                    <label for="diameter_sheyka_right_d11" class="form-label">d1'</label>
                    <BFormInput v-model="formData.diameter_sheyka_right_d11" id="diameter_sheyka_right_d11"/>
                </div>
                <div class="col-2">
                    <label for="diameter_sheyka_right_d2" class="form-label">d2</label>
                    <BFormInput v-model="formData.diameter_sheyka_right_d2" id="diameter_sheyka_right_d2"/>
                </div>
                <div class="col-2">
                    <label for="diameter_sheyka_right_d22" class="form-label">d2'</label>
                    <BFormInput v-model="formData.diameter_sheyka_right_d22" id="diameter_sheyka_right_d22"/>
                </div>
                <div class="col-2">
                    <label for="diameter_sheyka_right_d3" class="form-label">d3</label>
                    <BFormInput v-model="formData.diameter_sheyka_right_d3" id="diameter_sheyka_right_d3"/>
                </div>
                <div class="col-2">
                    <label for="diameter_sheyka_right_d33" class="form-label">d3'</label>
                    <BFormInput v-model="formData.diameter_sheyka_right_d33" id="diameter_sheyka_right_d33"/>
                </div>

                <!-- left -->
                <label class="form-label">Левая</label>
                <div class="col-2">
                    <label for="diameter_sheyka_left_d1" class="form-label">d1</label>
                    <BFormInput v-model="formData.diameter_sheyka_left_d1" id="diameter_sheyka_left_d1"/>
                </div>
                <div class="col-2">
                    <label for="diameter_sheyka_left_d11" class="form-label">d1'</label>
                    <BFormInput v-model="formData.diameter_sheyka_left_d11" id="diameter_sheyka_left_d11"/>
                </div>
                <div class="col-2">
                    <label for="diameter_sheyka_left_d2" class="form-label">d2</label>
                    <BFormInput v-model="formData.diameter_sheyka_left_d2" id="diameter_sheyka_left_d2"/>
                </div>
                <div class="col-2">
                    <label for="diameter_sheyka_left_d22" class="form-label">d2'</label>
                    <BFormInput v-model="formData.diameter_sheyka_left_d22" id="diameter_sheyka_left_d22"/>
                </div>
                <div class="col-2">
                    <label for="diameter_sheyka_left_d3" class="form-label">d3</label>
                    <BFormInput v-model="formData.diameter_sheyka_left_d3" id="diameter_sheyka_left_d3"/>
                </div>
                <div class="col-2">
                    <label for="diameter_sheyka_left_d33" class="form-label">d3'</label>
                    <BFormInput v-model="formData.diameter_sheyka_left_d33" id="diameter_sheyka_left_d33"/>
                </div>

                <div><hr></div>

                <div class="col-3 mt-3">
                    <label for="greatest_ovality_right" class="form-label">Наибольшая овальность шейка оси в мм</label>
                </div>
                <div class="col-3 mt-3">
                    <label for="greatest_taper_right" class="form-label">Наибольшая конусность шейка оси в мм</label>
                </div>
                <div class="col-3 mt-3">
                    <label for="posad_diameter_kolsa_right" class="form-label">Посадочный диаметр лабиринтного кольца в мм</label>
                </div>
                <div class="col-3 mt-3">
                    <label for="preload_kolsa_right" class="form-label">Натяг на посадку лабиринтного кольца в мм</label>
                </div>
                <label class="form-label">правая</label>
                <div class="col-3">
                    <BFormInput v-model="formData.greatest_ovality_right" id="greatest_ovality_right" placeholder="правая"/>
                </div>
                <div class="col-3">
                    <BFormInput v-model="formData.greatest_taper_right" id="greatest_taper_right" placeholder="правая"/>
                </div>
               
                <div class="col-3">
                    <BFormInput v-model="formData.posad_diameter_kolsa_right" id="posad_diameter_kolsa_right" placeholder="правая"/>
                </div>
                <div class="col-3">
                    <BFormInput class="mt-1" v-model="formData.preload_kolsa_right" id="preload_kolsa_right" placeholder="левая"/>
                </div>

                <label class="form-label">левая</label>
                <div class="col-3">
                    <BFormInput class="mt-1" v-model="formData.greatest_ovality_left" id="greatest_ovality_left" placeholder="левая"/>
                </div>
                <div class="col-3">
                    <BFormInput class="mt-1" v-model="formData.greatest_taper_left" id="greatest_taper_left" placeholder="левая"/>
                </div>
               
                <div class="col-3">
                    <BFormInput class="mt-1" v-model="formData.posad_diameter_kolsa_left" id="posad_diameter_kolsa_left" placeholder="левая"/>
                </div>
                <div class="col-3">
                    <BFormInput class="mt-1" v-model="formData.preload_kolsa_left" id="preload_kolsa_left" placeholder="левая"/>
                </div>

                <div><hr></div>

                <!--  -->
                <div class="col-4 mt-3">
                    <label for="radial_gap_right_rear" class="form-label">Радиальный зазор  в свободном состояни</label>
                </div>
                <div class="col-4 mt-3">
                    <label for="posad_diameter_buks_right_D1" class="form-label">Посадочные диаметры букс</label>
                </div>
                <div class="col-4 mt-3">
                    <label for="posad_diameter_buks_right_D2" class="form-label">Посадочный диаметр лабиринтного кольца</label>
                </div>
                <label class="form-label">правая</label>
                <div class="col-4">
                    <BFormInput v-model="formData.radial_gap_right_rear" id="radial_gap_right_rear" placeholder="задний"/>
                    <BFormInput class="mt-1" v-model="formData.radial_gap_right_front" id="radial_gap_right_front" placeholder="передний"/>
                </div>
                <div class="col-4">
                    <BFormInput v-model="formData.posad_diameter_buks_right_D1" id="posad_diameter_buks_right_D1" placeholder="D1"/>
                    <BFormInput class="mt-1" v-model="formData.posad_diameter_buks_right_D11" id="posad_diameter_buks_right_D11" placeholder="D1'"/>
                </div>
                <div class="col-4">
                    <BFormInput v-model="formData.posad_diameter_buks_right_D2" id="posad_diameter_buks_right_D2" placeholder="D2"/>
                    <BFormInput class="mt-1" v-model="formData.posad_diameter_buks_right_D22" id="posad_diameter_buks_right_D22" placeholder="D2'"/>
                </div>
                <label class="form-label">левая</label>
                <div class="col-4">
                    <BFormInput v-model="formData.radial_gap_left_rear" id="radial_gap_left_rear" placeholder="задний"/>
                    <BFormInput class="mt-1" v-model="formData.radial_gap_left_front" id="radial_gap_left_front" placeholder="передний"/>
                </div>
                <div class="col-4">
                    <BFormInput v-model="formData.posad_diameter_buks_left_D1" id="posad_diameter_buks_left_D1" placeholder="D1"/>
                    <BFormInput class="mt-1" v-model="formData.posad_diameter_buks_left_D11" id="posad_diameter_buks_left_D11" placeholder="D1'"/>
                </div>
                <div class="col-4">
                    <BFormInput v-model="formData.posad_diameter_buks_left_D2" id="posad_diameter_buks_left_D2" placeholder="D2"/>
                    <BFormInput class="mt-1" v-model="formData.posad_diameter_buks_left_D22" id="posad_diameter_buks_left_D22" placeholder="D2'"/>
                </div>

                <div><hr></div>

                <!--  -->
                <div class="col-8 mt-3">
                    <label for="radial_gap_right_rear" class="form-label">Завод-изготовитель, условное обозначение и номер подшипника месяц и год изготовления </label>
                </div>
                
                <div class="col-4 mt-3">
                    <label for="posad_diameter_buks_right_D2" class="form-label">Выход закрепительной втулки в мм</label>
                </div>
                <label class="form-label">правая</label>
                <div class="col-4">
                    <BFormInput v-model="formData.manufacturer_right_rear" id="manufacturer_right_rear" placeholder="задний номер подшипника"/>
                    <BFormInput class="mt-1" v-model="formData.design_right_rear" id="design_right_rear" placeholder="условное обозначение"/>
                </div>
                <div class="col-4">
                    <BFormInput v-model="formData.manufacturer_right_front" id="manufacturer_right_front" placeholder="передний номер подшипника"/>
                    <BFormInput class="mt-1" v-model="formData.design_right_front" id="design_right_front" placeholder="условное обозначение'"/>
                </div>
                <div class="col-4">
                    <BFormInput v-model="formData.output_vtuki_right_1" id="output_vtuki_right_1"/>
                    <BFormInput class="mt-1" v-model="formData.output_vtuki_right_2" id="output_vtuki_right_2" />
                </div>
                <label class="form-label">левая</label>
                <div class="col-4">
                    <BFormInput v-model="formData.manufacturer_left_rear" id="manufacturer_left_rear" placeholder="задний номер подшипника"/>
                    <BFormInput class="mt-1" v-model="formData.design_left_rear" id="design_left_rear" placeholder="условное обозначение"/>
                </div>
                <div class="col-4">
                    <BFormInput v-model="formData.manufacturer_left_front" id="manufacturer_left_front" placeholder="передний номер подшипника"/>
                    <BFormInput class="mt-1" v-model="formData.design_left_front" id="design_left_front" placeholder="условное обозначение'"/>
                </div>
                <div class="col-4">
                    <BFormInput v-model="formData.output_vtuki_left_1" id="output_vtuki_left_1"/>
                    <BFormInput class="mt-1" v-model="formData.output_vtuki_left_2" id="output_vtuki_left_2" />
                </div>

                <div><hr></div>

                <!--  -->
                <div class="col-4 mt-3">
                    <label for="radial_gap_right_rear" class="form-label">Продвижение закрепительной втулки или посадочный диаметр внутренного кольца </label>
                </div>
                <div class="col-4 mt-3">
                    <label for="radial_gap_right_rear" class="form-label">Давление запрессовки в т. или натяг на посадку внутренного кольца в ммё </label>
                </div>
                <div class="col-4 mt-3">
                    <label for="posad_diameter_buks_right_D2" class="form-label">ЛЗЦНИИ</label>
                </div>
                <label class="form-label">правая</label>
                <div class="col-4">
                    <BFormInput v-model="formData.internal_diameter_kolsa_right_1" id="manufacturer_right_rear" />
                    <BFormInput class="mt-1" v-model="formData.internal_diameter_kolsa_right_2" id="design_right_rear" />
                </div>
                <div class="col-4">
                    <BFormInput v-model="formData.internal_preload_kolsa_right_1" id="manufacturer_right_front" />
                    <BFormInput class="mt-1" v-model="formData.internal_preload_kolsa_right_2" id="design_right_front" />
                </div>
                <div class="col-4">
                    <BFormInput v-model="formData.lzsni" id="output_vtuki_right_1"/>
                </div>
                <label class="form-label">левая</label>
                <div class="col-4">
                    <BFormInput v-model="formData.internal_diameter_kolsa_left_1" id="manufacturer_left_rear" />
                    <BFormInput class="mt-1" v-model="formData.internal_diameter_kolsa_left_2" id="design_left_rear" />
                </div>
                <div class="col-4">
                    <BFormInput v-model="formData.internal_preload_kolsa_left_1" id="manufacturer_left_front" />
                    <BFormInput class="mt-1" v-model="formData.internal_preload_kolsa_left_2" id="design_left_front" />
                </div>

        <!--    NT-1/227-24    -->

                
            </div>
        </BModal>
        <!-- Modal create -->
       
        <!-- Filter -->
        <div class="row mt-5">
        <div class="col-12">
            <div class="card shadow-sm">
            <div class="card-body ">
                <div class="row gy-3">
                    <button
                        class="btn btn-success d-flex align-items-center justify-content-center fs-6 m-3 col" 
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        @click="modalCreate = !modalCreate"
                    >
                        <i class="bi bi-plus-circle me-2"></i>
                        <span>Add</span>
                    </button>
                    <div class="col-10">
                        <div>
                            <BFormRadioGroup
                            id="radio-group-1"
                            v-model="groupedSelected"
                            :options="groupedOptions"
                            name="radio-options"
                            />
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>


         <!-- List -->
        <div class="mt-5">
            <div class="card shadow-sm" style="overflow: auto; white-space: nowrap">
                <div class="card-body">
                <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
                    <BThead >
                        <BTr >
                            <BTd rowspan="2" class="vertical-text">№</BTd>
                            <BTd rowspan="2" class="vertical-text">№ по порядку </BTd>
                            <BTd rowspan="2" class="vertical-text">Дата монтажа </BTd>
                            <BTd rowspan="2" class="vertical-text">Номер плавки и номер <br>колесной пары</BTd>
                            <BTd rowspan="2" class="vertical-text">Клейма полных освидетельствований <br> колесной пары </BTd>
                            <BTd rowspan="2" class="vertical-text">Шейка оси</BTd>
                            <BTd colspan="6">Диаметры шейка оси в мм</BTd>
                            <BTd rowspan="2"  class="vertical-text">Наибольшая овальность <br> шейка оси в мм</BTd>
                            <BTd rowspan="2" class="vertical-text">Наибольшая конусность <br> шейка оси в мм</BTd>
                            <BTd colspan="2" class="vertical-text">Посадочный диаметр <br> лабиринтного кольца в мм</BTd>
                            <BTd class="vertical-text">Натяг на посадку <br> лабиринтного кольца в мм</BTd>
                            <BTd class="vertical-text">Радиальный зазор  в <br> свободном состояни</BTd>
                            <BTd colspan="4">Посадочные  <br>  диаметры букс </BTd>
                            <BTd colspan="2" class="vertical-text">Завод-изготовитель, <br> условное обозначение и <br> номер подшипника <br> месяц и год <br>изготовления </BTd>
                            <BTd rowspan="2" class="vertical-text">Выход закрепительной втулки в мм</BTd>
                            <BTd rowspan="2" class="vertical-text">Продвижение закрепительной втулки  <br> или посадочный диаметр внутренного <br> кольца в мм </BTd>
                            <BTd rowspan="2" class="vertical-text">Давление запрессовки в т. или натяг <br> на посадку внутренного кольца в ммё </BTd>
                            <BTd rowspan="2" class="vertical-text">ЛЗЦНИИ</BTd>
                            <BTd rowspan="2" class="vertical-text">Подпись инспектора ОТК или техника <br> по измерению подшипников</BTd>
                            <BTd rowspan="2" class="vertical-text">Подпись мастера смены</BTd>
                            
                        </BTr>
                        <BTr >
                            <BTd >d1</BTd>
                            <BTd >d1'</BTd>
                            <BTd >d2</BTd>
                            <BTd >d2'</BTd>
                            <BTd >d3</BTd>
                            <BTd >d3'</BTd>
                            <BTd >d4</BTd>
                            <BTd >d4'</BTd>
                            <BTd >d3 d4' / d3' d4'</BTd>
                            <BTd > задний /передний</BTd>
                            <BTd >D1</BTd>
                            <BTd >D1'</BTd>
                            <BTd >D2</BTd>
                            <BTd >D2'</BTd>
                            <BTd > задний </BTd>
                            <BTd > передний</BTd>
                            
                        </BTr>
                    </BThead>
                    <BTbody>
                       
                    
                    </BTbody>
                </BTableSimple>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const addToggle = ref(false)
const modalCreate = ref(false);
const Data = ref([])
const vu53s = ref([])
const employeeList = ref([])

const formData = ref({
    register_number: '',
    register_time: '',
    vu53_register_number: '',
    vu53_number: '',
    stamps: '',
    diameter_sheyka_right_d1: '',
    diameter_sheyka_right_d11: '',
    diameter_sheyka_left_d1: '',
    diameter_sheyka_left_d11: '',
    diameter_sheyka_right_d2: '',
    diameter_sheyka_right_d22: '',
    diameter_sheyka_left_d2: '',
    diameter_sheyka_left_d22: '',
    diameter_sheyka_right_d3: '',
    diameter_sheyka_right_d33: '',
    diameter_sheyka_left_d3: '',
    diameter_sheyka_left_d33: '',
    greatest_ovality_right: '',
    greatest_ovality_left: '',
    greatest_taper_right: '',
    greatest_taper_left: '',
    posad_diameter_kolsa_right: '',
    posad_diameter_kolsa_left: '',
    preload_kolsa_right: '',
    preload_kolsa_left: '',
    radial_gap_right_rear: '',
    radial_gap_right_front: '',
    radial_gap_left_rear: '',
    radial_gap_left_front: '',
    posad_diameter_buks_right_D1: '',
    posad_diameter_buks_right_D11: '',
    posad_diameter_buks_left_D1: '',
    posad_diameter_buks_left_D11: '',
    posad_diameter_buks_right_D2: '',
    posad_diameter_buks_right_D22: '',
    posad_diameter_buks_left_D2: '',
    posad_diameter_buks_left_D22: '',
    manufacturer_right_rear: '',
    design_right_rear: '',
    manufacturer_left_rear: '',
    design_right_left_rear: '',
    manufacturer_right_front: '',
    design_right_front: '',
    manufacturer_left_front: '',
    design_right_left_front: '',
    output_vtuki_right_1: '',
    output_vtuki_right_2: '',
    output_vtuki_left_1: '',
    output_vtuki_left_2: '',
    internal_diameter_kolsa_right_1: '',
    internal_diameter_kolsa_right_2: '',
    internal_diameter_kolsa_left_1: '',
    internal_diameter_kolsa_left_2: '',
    internal_preload_kolsa_right_1: '',
    internal_preload_kolsa_right_2: '',
    internal_preload_kolsa_left_1: '',
    internal_preload_kolsa_left_2: '',
    lzsni: '',
    inspector: '',
});

const groupedOptions = [
  {text: 'ЎТЙ', value: 'ЎТЙ'},
  {text: 'СНГ', value: 'СНГ'},
  {text: 'СОБ', value: 'СОБ'},
]

const groupedSelected = ref()

const handleOk = async() => {
    try {
        if (formData.value._id) {
            const isConfirmed = confirm("O'zgarishni Saqlamoqchimisiz?");
            if(isConfirmed) {
                let res = await axios.patch("/api/gildirak-sexi/vu-90/update/" + formData.value._id, formData.value);
                if (res.data) {
                    addToggle.value = !addToggle.value
                    makeFormNull();
                    getAll();
                }
            }
        }else {
            const isConfirmed = confirm("Saqlamoqchimisiz");
            if(isConfirmed) {
                let res = await axios.post("/api/gildirak-sexi/vu-90/create", formData.value);
                if (res.data) {
                    addToggle.value = !addToggle.value
                    makeFormNull();
                    getAll();
                }
            }  
        }
        
    } catch (error) {
        console.error(error);
    }
}

const makeFormNull = () => {
    formData.value.register_number= null,
    formData.value.register_time= null,
    formData.value.type= null,
    formData.value.depoManifactured= null,
    formData.value.nomer= null,
    formData.value.defect= null,
    formData.value.inspector= null
}

// getAllData
const getAll = async() => {
    try {
        let res = await axios.get(`/api/gildirak-sexi/vu-90/all?status=${encodeURIComponent(groupedSelected.value)}`);
        if (res.data) { 
            Data.value = res.data;
        }

    } catch (error) {
        console.error(error);
    }
}

const getOne = async(id, status) => {
    try {
        let res = await axios.get("/api/gildirak-sexi/vu-90/one/" + id  + '/' + status);
        if (res.data) {
            addData()
            formData.value = res.data;
        }
    } catch (error) {
        console.error(error);
    }
}

// allEmployee
const allEmployee = async() => {
    try {
    let res = await axios.get(`/api/employee/all?section=g'ildirakSexi`);
    if (res.data) {
        employeeList.value = res.data.map(function (item) {
            return { text: item.name, value: item._id};
        });
    }
  } catch (error) {
    console.error(error);
  }
}

// allRepairingVagons
const getAllVu53 = async() => {
    try {
    let res = await axios.get(`/api/gildirak-sexi/vu-53/all?status=${encodeURIComponent(groupedSelected.value)}`);
    if (res.data) {
        vu53s.value = res.data.map(function (item) {
            return { text: item.register_number, value: item._id, number: item.number, stamps: item.buksa};
        });
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
    groupedSelected.value = 'ЎТЙ';
    formData.value.status = groupedSelected.value;
    getAll();
    allEmployee();
    getAllVu53
});

watch(
  [groupedSelected, formData.value],
  async () => {
    formData.value.status = groupedSelected.value;
    formData.value.vu53_number = vu53s.value.find(item => item.value == formData.value.vu53_register_number)?.number;
    formData.value.stamps = vu53s.value.find(item => item.value == formData.value.vu53_register_number)?.stamps;
    getAll();
    getAllVu53();
  },
  { deep: true }
);


</script>

<style lang="scss" scoped>

.vertical-text {
    writing-mode: vertical-rl; 
    transform: rotate(180deg);
    white-space: nowrap; 
}

.center-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>