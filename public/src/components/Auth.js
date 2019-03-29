export default {
    name: 'Auth',
    created: function () {
        // this.$session.remove('asdf')
    },
    data: function () {
        return {
            name: null,
            password: null,
        }
    },
    methods: {
        auth: function () {
            axios.post('/admin/auth', {
                name: this.name,
                password: this.password
            })
            .then( (response) => {
                if (response.data.iUserID) {
                    this.$session.set('iUserID', response.data.iUserID)
                    this.$router.push('/project')
                } else {
                    Vue.set(this, 'password', null)

                    const element =  document.querySelector('.wrap')
                    element.classList.add('animated', 'shake')
                    element.addEventListener('animationend', function() { 
                        element.classList.remove('animated', 'shake')
                    })
                }
            })
        }
    },
    template: `
    <main class="container">
        <section class="admin auth">
            <div class="auth__table">
                <div class="auth__td">
                    <div class="auth__box">
                        <div class="container__logo-column auth__logo-column container__logo-column_static">
                            
                            <div class="logo logo_relative logo_default">
                                <div class="logo__image">
                                    <svg viewBox="0 0 120 566.37067"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#logo"></use></svg>	
                                </div>

                                <div class="logo__text">
                                    <div class="str">
                                        <span>Проектирование и разработка</span>
                                    </div>
                                    <div class="str">
                                        <span>программных продуктов</span>
                                    </div>
                                    <div class="str">
                                        <span>по всему миру</span>
                                    </div>						
                                </div>
                            </div>				
                            
                        </div>				
                        <div class="wrap wrap_small">
                            <h2 class="title auth__title title_big">
                                Добро пожаловать <i class="br"></i>в личный кабинет Synell
                            </h2>
                            <p class="small">Для того, чтобы войти, авторизуйтесь в системе</p>

                            <form action="#" class="form auth__form" @submit.prevent="auth">
                                <div class="form__data">
                                    <div class="form__item">
                                        <input type="email" autocomplete="off" class="form__input" v-model="name" required>
                                        <div class="form__placeholder">Email</div>
                                    </div>	

                                    <div class="form__item">
                                        <input type="password" autocomplete="off" class="form__input form__input_withicon"  v-model="password" required="">
                                        <div class="form__placeholder">Пароль</div>

                                        <div class="form__password">
                                            <svg viewBox="0 0 98.480244 56.793997"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#password"></use></svg>	
                                        </div>
                                    </div>													
                                </div>


                                <div class="inline form__bottom">
                                    <div class="auth__button-parent hover-to-hide">
                                        <button class="button form__button" data-text="Войти">
                                            <span class="button__inner">авторизоваться</span>
                                        </button>								
                                    </div>
                                    <div class="form__conf hide-for-button">
                                        <a href="#" class="link-with-arrow auth__link link">

                                            <span class="link-with-arrow__icon">
                                                <span class="link__icon-hover">
                                                    <svg viewBox="0 0 384 512"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lock"></use></svg>
                                                </span>
                                                <span class="link__icon-default">
                                                    <svg viewBox="0 0 384 512"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lock"></use></svg>
                                                </span>											
                                            </span>
                                            <span class="link-with-arrow__text link__text">Забыли пароль?</span>
                                        </a>
                                    </div>
                                </div>

                                
                            </form>				
                        </div>							
                    </div>
                
                </div>
            </div>

        </section>
    </main>
    `,
}
