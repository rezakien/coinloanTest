<template lang="pug">
.user__actions
  .action__show_profile
    <img src="@/static/user-profile.svg"/>
  .action__show_user_actions(@click="showUserActions()")
    span My Account
    svg :class="dropdownMenuClasses" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-angle-down fa-w-10 select-box-placement__bottom vs__open-indicator" <path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" class=""></path>
    <ul :class="dropdownMenuClasses">
      li.user_action.bold__6(v-for="action in userActions")
        a(:href="action.link") {{ action.title }}
    </ul>
</template>

<script>
export default {
    name: 'AppUserActions',
    data: function () {
        return {
            menuActivated: false,
            languages: [
                {
                    title: 'English',
                    flag: '',
                    code: ''
                },
                {
                    title: 'Русский',
                    flag: '',
                    code: ''
                },
            ],
            userActions: [
                {
                    title: 'Account',
                    link: '#'
                },
                {
                    title: 'Offers',
                    link: '#'
                },
                {
                    title: 'Chat',
                    link: '#'
                },
                {
                    title: 'FAQ',
                    link: '#'
                },
                {
                    title: 'Logout',
                    link: '#'
                },
            ]
        }
    },
    methods: {
        showUserActions () {
            this.menuActivated = !this.menuActivated
        }
    },
    computed: {
        dropdownMenuClasses () {
            return this.menuActivated ? 'dropdown-menu active' : 'dropdown-menu'
        }
    }
}
</script>

<style lang="scss" scoped>
.user__actions {
  display: flex;
  gap: 10px;
  img {
    width: 25px;
  }
  .action__show_profile {
    cursor: pointer;
  }
  .action__show_user_actions {
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    svg {
      width: 14px;
      height: 14px;
      transition: 0.1s ease-in;
      &.active {
        transform: rotate(180deg);
      }
    }
    ul.dropdown-menu {
      position: absolute;
      top: 70px;
      right: 50px;
      z-index: 10;
      min-width: 250px;
      margin-top: 1rem;
      overflow-y: auto;
      padding: 0.5em;
      border-radius: 15px;
      background-color: white;
      border: 1px solid #ccc;
      box-shadow: 6px 8px 17px -10px rgba(34, 60, 80, 0.2);
      list-style: none;
      display: none;
      &.active {
        display: block;
      }
      li.user_action {
        a {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          text-decoration: none;
          color: $text-color;
          padding: 0.8rem 0.8rem 0.8rem 2rem;
          margin-top: 0.2rem;
          margin-bottom: 0.2rem;
          border-radius: 10px;
          &:hover {
            background-color: rgb(236, 236, 236);
          }
        }
      }
    }
  }
}
</style>