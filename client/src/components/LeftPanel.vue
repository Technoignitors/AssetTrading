<template>
    <div class="sidebar" data-color="purple" data-image="assets/img/sidebar-5.jpg">
    	<div class="sidebar-wrapper">
            <div class="logo">
                <a class="simple-text">
                    Techno Ignitors
                </a>
            </div>

            <ul class="nav">
                <li class="active">
                    <a>
                        <i class="pe-7s-graph"></i>
                        <router-link to="/" tag="p"  exact>Dashboard</router-link>
                    </a>
                </li>
                <li>
                    <a>
                        <i class="pe-7s-user"></i>
                        <router-link to="/" tag="p"  exact>User Profile</router-link>
                    </a>
                </li>
                <li>
                    <a>
                        <i class="pe-7s-note2"></i>
                        <router-link to="/" tag="p"  exact>Table List</router-link>
                    </a>
                </li>
                <li>
                    <a>
                        <i class="pe-7s-news-paper"></i>
                        <router-link to="/" tag="p"  exact>Typography</router-link>
                    </a>
                </li>
                <li>
                    <a>
                        <i class="pe-7s-science"></i>
                        <router-link to="/" tag="p"  exact>Icons</router-link>
                    </a>
                </li>
                <li>
                    <a>
                        <i class="pe-7s-map-marker"></i>
                        <router-link to="/" tag="p"  exact>Maps</router-link>
                    </a>
                </li>
                <li>
                    <a>
                        <i class="pe-7s-bell"></i>
                        <router-link to="/" tag="p"  exact>Notifications</router-link>
                    </a>
                </li>
				<li class="active-pro">
                    <a>
                        <i class="pe-7s-rocket"></i>
                        <router-link to="/" tag="p"  exact>Upgrade to PRO</router-link>
                    </a>
                </li>
            </ul>
    	</div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.sidebar-wrapper a {
    cursor: pointer;
}
</style>


