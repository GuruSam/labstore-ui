<template>
  <div>
    <v-menu v-if="$vuetify.breakpoint.smAndDown" bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          link
          :href="item.href"
          :key="i"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <div v-else>
      <a
        v-for="(item, i) in items"
        :key="i"
        :href="item.href"
        class="white--text font-weight-light mr-4"
      >
        {{ item.title }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    items: [
      { title: 'Главная', href: 'https://playlabirint.ru/' },
      { title: 'Игра', href: 'https://playlabirint.ru/game' },
      { title: 'Пограничье', href: 'https://thesims.cc/forums/pograniche.226/' }
    ]
  })
}
</script>
