<template>
    <div class="sidebar" data-color="purple" data-image="assets/img/sidebar-5.jpg">
    	<div class="sidebar-wrapper">
            <div class="logo">
                <a class="simple-text">
                    Techno Ignitors
                </a>
            </div>

            <ul class="nav">
                <router-link to="/dashboard" tag="li" exact active-class="active"><a>
                        <i class="pe-7s-graph"></i>
                        <p>Dashboard</p>
                    </a>
                </router-link>
                <router-link to="/profile" tag="li" exact active-class="active"><a>
                        <i class="pe-7s-user"></i>
                        <p>Profile</p>
                    </a>
                </router-link>
                 <router-link to="/myassets" tag="li" exact active-class="active"><a>
                        <i class="pe-7s-user"></i>
                        <p>My Assets</p>
                    </a>
                </router-link>
                <router-link to="/orders" tag="li" exact active-class="active"><a>
                        <i class="pe-7s-news-paper"></i>
                        <p>My Orders</p>
                    </a>
                </router-link>
                <router-link to="/myapprovals" tag="li" exact active-class="active"><a>
                        <i class="pe-7s-news-paper"></i>
                        <p>My Approvals</p>
                    </a>
                </router-link>
                <router-link to="/sellasset" tag="li" exact active-class="active"><a>
                        <i class="pe-7s-news-paper"></i>
                        <p>Sell Asset</p>
                    </a>
                </router-link>
                 <router-link to="/profile" tag="li" exact class="active-pro"><a>
                        <i class="pe-7s-news-paper"></i>
                        <p>Upgrade to PRO</p>
                    </a>
                </router-link>

				
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


