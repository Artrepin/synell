export default {
    name: 'Project',
    created: function () {
        this.get()
    },
    data: function () {
        return {
            projects: [],
            project: false,
            modalTab: [
                {
                    name: 'РУС',
                    code: 'ru'
                },
                {
                    name: 'ENG',
                    code: 'en'
                }
            ],
            modalTabActive: 0,
            search: null
        }
    },
    methods: {
        get: function () {
            Vue.set(this, 'project', false)
            axios.post('/admin/project', {
                search: this.search
            })
            .then( (response) => {
                this.projects = response.data.projects
            })
        },
        openModal: function (index) {
            // Vue.set(this, 'modalTabActive', 0)
            Vue.set(this, 'project', index)
            Vue.nextTick(function () {
                $('.js-popup').click()
                // open_modal()
            })
        },
        add: function () {
            this.projects.push({
                sProjectImage: null,
                sProjectLinkDemo: null,
                sProjectLinkReady: null,
                iProjectPeriod: null,
                iProjectStaff: null,
                project_en: {
                    sProjectTitle: null,
                    sProjectTechnology: null,
                    tProjectDesc: null,
                    tProjectTask: null,
                    tProjectWork: null,
                    tProjectResult1: null,
                    tProjectResult2: null,
                    tProjectResult3: null,
                    tProjectResult4: null,
                },
                project_ru: {
                    sProjectTitle: null,
                    sProjectTechnology: null,
                    tProjectDesc: null,
                    tProjectTask: null,
                    tProjectWork: null,
                    tProjectResult1: null,
                    tProjectResult2: null,
                    tProjectResult3: null,
                    tProjectResult4: null,
                }
            })
            var index = this.projects.length-1
            this.openModal(index)
        },
        useModalTab: function (index) {
            Vue.set(this, 'modalTabActive', index)
        },
        update: function () {
            if (this.projects[this.project].project_ru.sProjectTitle == null) {
                Vue.set(this, 'modalTabActive', 0)
                return false
            }
            if (this.projects[this.project].project_en.sProjectTitle == null) {
                Vue.set(this, 'modalTabActive', 1)
                return false
            }
            axios.post('/admin/ProjectUpdate', {
                project: this.projects[this.project]
            })
            .then( (response) => {
                this.get()
                // Vue.set(this, 'project', false)
                // Vue.set(this.people, this.usePeople, response.data.people)
                // Vue.set(this, 'usePeople', false)
                close_modal()
            })
        },
        del: function () {
            Vue.set(this.projects[this.project], 'del', true)
            this.update()
            close_modal()
        },
        upload: function () {
            
            var form = new FormData();

            form.append('file', event.target.files[0]);

            var index = event.target.name


            axios.post('/admin/ProjectUpload', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'extension': event.target.files[0].name.split('.').pop()
                }
            }).then( (response) => {
                Vue.set(this.projects[this.project], 'sProjectImage', response.data.filename)
            })

        }
    },
    template: `
    <div>
        <main class="container">
            <section class="admin">
                <div class="wrap">
                    <div class="flex admin__row">
                        <div class="admin__part admin__part_top">
                            <header class="admin-head">
                                <div class="flex admin-head__row">
                                    
                                    <div class="admin__cell admin__cell_sidebar admin-head__logo">
                                        <img src="/img/admin/logo.png" alt="" class="admin-head__logo-image">
                                        <div class="admin-head__small-logo">
                                            <img src="/img/admin/logo-small.png" alt="">
                                        </div>
                                    </div>
                                    <div class="admin__cell admin-head__content admin__cell_content">
                                        
                                        <div class="flex admin__mobile-head">
                                            <div class="admin-head__cell admin-head__logo">
                                                <img src="/img/admin/logo.png" alt="" class="admin-head__logo-image">
                                            </div>
                                            <div class="admin-head__cell admin-head__cell_padding">
                                                <div class="user__name">Денис Горскин</div>
                                                <button class="button admin-head__mobile-button js-popup js-create-case" data-modal="#case-edit" data-text="создать проект">
                                                    <span class="button__inner">создать проект</span>
                                                </button>												
                                            </div>
                                        </div>
                                        <div class="inline admin-head__bottom">
                                            <div class="admin-head__cell">
                                                <div class="title admin-head__label">Проекты</div>
                                            </div>
                                            <div class="admin-head__cell">
                                                <form action="" class="search" @submit.prevent="">
                                                    <input type="text" name="q" class="search__input" placeholder="Поиск по сайту" autocomplete="off" v-model="search" v-on:keyup="get">

                                                    <button class="search__button">
                                                        <svg viewBox="0 0 54.998211 56.966"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use></svg>
                                                    </button>
                                                </form>
                                            </div>										
                                        </div>

                                    </div>
                                    
                                </div>
                            </header>
                        </div>
                        <div class="flex admin__part admin__part_middle">
                            <div class="sidebar admin__cell admin__cell_sidebar">
                                <div class="user">
                                    <div class="user__name">Денис Горскин</div>
                                    <div class="user__type">BOSS</div>
                                </div>

                                <button class="button sidebar__button js-popup js-create-case" data-modal="#case-edit" data-text="создать проект" v-on:click="add">
                                    <span class="button__inner">создать проект</span>
                                </button>	

                                <div class="sidebar__info">
                                    <div class="inline admin-logo">
                                        <img src="/img/admin/bottom-logo.png" alt="" class="admin-logo__image">
                                        <div class="admin-logo__label">SYNELL</div>
                                        
                                    </div>
                                    <div class="sidebar__small">Money making company </div>
                                    <div class="sidebar__small">2019</div>
                                </div>					
                            </div>
                            <div class="admin__cell admin__cell_content base">
                                <div class="base__empty" v-bind:class="{ 'js-show' : projects.length == 0}">
                                    <div class="base__empty-icon">
                                        <img src="/img/admin/pc.png" alt="">
                                    </div>
                                    <div class="base__empty-text">Создайте ваш первый кейс</div>
                                </div>
                                <div class="base__list admin-case">

                                    <div class="inline admin-case__inner custom-scroll custom-scroll_withbg">

                                        <div class="admin-case__item" v-for="(project, index) in projects" v-on:click="openModal(index)" v-if="project.del !== true && project.iProjectID">
                                            <div class="admin-case__edit js-popup"></div>
                                            <div class="admin-case__preview">
                                                <img v-if="project.sProjectImage" :src="'/img/project/' + project.sProjectImage" class="object-fit" alt="">
                                                <div class="admin-case__empty" else>111</div>
                                            </div>
                                            <div class="admin-case__name">
                                                <template v-if="project.project_ru && project.project_ru.sProjectTitle">
                                                    {{ project.project_ru.sProjectTitle }}
                                                </template>
                                                <template v-else>
                                                    Название проекта
                                                </template>
                                            </div>
                                            <div class="admin-case__info">Создал: <span class="admin-case__border">Денис Горскин</span></div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>				
                </div>
            </section>
        </main>


        <div class="modal">
        
            <div class="modal__item admin-modal" id="case-edit">
                <div class="wrap">
                    <div class="modal__close admin-modal__close">
                        <svg viewBox="0 0 357 357"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close"></use></svg>
                    </div>
                    <div class="modal__content" v-if="project !== false">
                        <div class="modal__content-default">
                            <ul class="inline admin__language-list text-center">
                                <li class="admin__language-item" v-for="(tab, index) in modalTab">
                                    <label class="admin__radio" v-on:click="useModalTab(index)">
                                        <input type="radio" name="language" class="admin__radio-input" :checked="modalTabActive == index">
                                        <span class="admin__radio-text">{{ tab.name }}</span>
                                    </label>
                                </li>
                            </ul>
                            <form action="" class="admin-modal__form form" @submit.prevent="update">
                                <input type="hidden" name="admin-type" value="create">
                                <input type="hidden" name="case-id" value="">

                                <div class="inline">
                                    <div class="admin-modal__column">
                                        <div class="admin-modal__row">
                                            <figure class="admin-modal__preview">
                                                <img v-if="projects[project].sProjectImage" :src="'/img/project/' + projects[project].sProjectImage" class="object-fit" alt="">
                                            </figure>
                                        </div>

                                        <div class="inline admin-modal__row">

                                            <label class="admin-modal__cell admin-modal__cell_middle">
                                                <input type="file" name="case-preview" hidden="" class="js-preview-image-select" @change="upload" />
                                                <div class="link-with-arrow admin-modal__link link js-file-link">

                                                    <span class="link-with-arrow__icon">
                                                        <span class="link__icon-hover">
                                                            <svg viewBox="0 0 14 16"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use></svg>
                                                        </span>
                                                        <span class="link__icon-default">
                                                            <svg viewBox="0 0 14 16"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use></svg>
                                                        </span>											
                                                    </span>
                                                    <span class="link-with-arrow__text link__text">Загрузить обложку</span>
                                                </div>
                                            </label>

                                            <div class="admin-modal__cell admin-modal__cell_middle">
                                                <input type="text" placeholder="Ссылка на demo" class="form__default-input" v-model="projects[project].sProjectLinkDemo">
                                            </div>
                                        </div>									

                                        <div class="inline admin-modal__row admin-modal__row_small">
                                            
                                            <div class="admin-modal__cell">
                                                <div class="clear">
                                                    <label class="form__label clear__left">Название</label>
                                                    <label class="form__label clear__right">
                                                        <template v-if="modalTabActive == 0 && projects[project].project_ru.sProjectTitle">
                                                            {{ projects[project].project_ru.sProjectTitle.length }} / 60
                                                        </template>
                                                        <template v-else-if="modalTabActive == 1 && projects[project].project_en.sProjectTitle">
                                                            {{ projects[project].project_en.sProjectTitle.length }} / 60
                                                        </template>
                                                        <template v-else>
                                                            0 / 60
                                                        </template>
                                                    </label>
                                                </div>
                                                
                                                <input type="text" class="form__default-input js-case-name" maxlength="60" required v-if="modalTabActive == 0" v-model="projects[project].project_ru.sProjectTitle">
                                                <input type="text" class="form__default-input js-case-name" maxlength="60" required v-if="modalTabActive == 1" v-model="projects[project].project_en.sProjectTitle">
                                            </div>

                                            <div class="admin-modal__cell">
                                                <label class="form__label">Ссылка на результат</label>
                                                <input type="text" class="form__default-input" v-model="projects[project].sProjectLinkReady">
                                            </div>

                                        </div>

                                        <div class="admin-modal__row admin-modal__row_small">
                                            <label class="form__label clear__left">Стек технологий</label>
                                            <input type="text" class="form__default-input" v-if="modalTabActive == 0" v-model="projects[project].project_ru.sProjectTechnology">
                                            <input type="text" class="form__default-input" v-if="modalTabActive == 1" v-model="projects[project].project_en.sProjectTechnology">
                                            
                                        </div>		

                                        <div class="admin-modal__row admin-modal__row_small">
                                            <label class="form__label clear__left">Короткое описание</label>
                                            <textarea class="form__default-textarea" style="height: 15.7rem" v-if="modalTabActive == 0" v-model="projects[project].project_ru.tProjectDesc"></textarea>
                                            <textarea class="form__default-textarea" style="height: 15.7rem" v-if="modalTabActive == 1" v-model="projects[project].project_en.tProjectDesc"></textarea>
                                        </div>																	
                                    </div>
                                    <div class="admin-modal__column">
                                        <div class="admin-modal__row">
                                            <label class="form__label clear__left">Задача проекта</label>
                                            <textarea class="form__default-textarea" v-if="modalTabActive == 0" v-model="projects[project].project_ru.tProjectTask"></textarea>
                                            <textarea class="form__default-textarea" v-if="modalTabActive == 1" v-model="projects[project].project_en.tProjectTask"></textarea>
                                        </div>	

                                        <div class="admin-modal__row">
                                            <label class="form__label clear__left">Что было сделано</label>
                                            <textarea class="form__default-textarea" v-if="modalTabActive == 0" v-model="projects[project].project_ru.tProjectWork"></textarea>
                                            <textarea class="form__default-textarea" v-if="modalTabActive == 1" v-model="projects[project].project_en.tProjectWork"></textarea>
                                        </div>														
                                        <div class="inline admin-modal__row">

                                            <div class="admin-modal__cell">
                                                <label class="form__label">Какой результат получен 1.</label>
                                                <input type="text" class="form__default-input" v-if="modalTabActive == 0" v-model="projects[project].project_ru.tProjectResult1">
                                                <input type="text" class="form__default-input" v-if="modalTabActive == 1" v-model="projects[project].project_en.tProjectResult1">
                                            </div>

                                            <div class="admin-modal__cell">
                                                <label class="form__label">Какой результат получен 2.</label>
                                                <input type="text" class="form__default-input" v-if="modalTabActive == 0" v-model="projects[project].project_ru.tProjectResult2">
                                                <input type="text" class="form__default-input" v-if="modalTabActive == 1" v-model="projects[project].project_en.tProjectResult2">
                                            </div>

                                        </div>
                                        <div class="inline admin-modal__row">

                                            <div class="admin-modal__cell">
                                                <label class="form__label">Какой результат получен 3.</label>
                                                <input type="text" class="form__default-input" v-if="modalTabActive == 0" v-model="projects[project].project_ru.tProjectResult3">
                                                <input type="text" class="form__default-input" v-if="modalTabActive == 1" v-model="projects[project].project_en.tProjectResult3">
                                            </div>

                                            <div class="admin-modal__cell">
                                                <label class="form__label">Какой результат получен 4.</label>
                                                <input type="text" class="form__default-input" v-if="modalTabActive == 0" v-model="projects[project].project_ru.tProjectResult4">
                                                <input type="text" class="form__default-input" v-if="modalTabActive == 1" v-model="projects[project].project_en.tProjectResult4">
                                            </div>

                                        </div>	

                                        <div class="inline admin-modal__row">
                                            
                                            <div class="admin-modal__cell">
                                                <label class="form__label">Срок разработки</label>
                                                <input type="text" class="form__default-input" v-model="projects[project].iProjectPeriod">
                                            </div>

                                            <div class="admin-modal__cell">
                                                <label class="form__label">Количество специалистов</label>
                                                <input type="text" class="form__default-input" v-model="projects[project].iProjectStaff">
                                            </div>

                                        </div>

                                        <div class="inline admin-modal__row">

                                            <div class="admin-modal__button-parent hover-to-hide">
                                                <button class="button form__button" v-bind:data-text="projects[project].iProjectID ? 'сохранить кейс' : 'создать кейс'">
                                                    <span class="button__inner">
                                                        <template v-if="projects[project].iProjectID">сохранить кейс</template>
                                                        <template v-else>создать кейс</template>                                                        
                                                    </span>
                                                </button>
                                            </div>
                                            
                                            <div class="form__conf hide-for-button text-left" v-if="projects[project].iProjectID">
                                                <a href="#" class="link-with-arrow admin-modal__default link" v-on:click="del">
                                                    <span class="link-with-arrow__text link__text">Удалить</span>
                                                </a>
                                            </div>											
                                        </div>
                            
                                                                                            
                                    </div>
                                </div>							
                            </form>
                
                        </div>
                    </div>

                </div>
            </div>		

        </div>
    </div>
    `,
}
