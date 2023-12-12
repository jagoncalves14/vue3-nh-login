<template>
	<div class="min-h-full">
		<header class="border-gray-200 bg-white px-4 py-2.5 lg:px-6">
			<div class="mx-auto max-w-screen-xl flex flex-wrap items-center justify-between">
				<div class="flex items-center">
					<RouterLink to="/" class="block border-0 border-none p-0 px-4 py-2 text-base text-gray-700 no-underline hover:bg-transparent hover:text-green-700">
						<img alt="Vue logo" src="@/assets/logo.svg" width="65" height="65">
					</RouterLink>
				</div>

				<div class="hidden w-full items-center justify-between lg:w-auto lg:flex">
					<ul class="mt-4 flex flex-col list-none font-medium lg:mt-0 lg:flex-row lg:space-x-8">
						<li>
							<RouterLink v-slot="{ isActive }" to="/" class="block border-0 border-none p-0 px-4 py-2 text-base text-gray-700 no-underline hover:bg-transparent hover:text-green-700">
								<span :class="{ 'text-green-500': isActive }">Home</span>
							</RouterLink>
						</li>
						<li>
							<RouterLink v-slot="{ isActive }" to="/some-page" class="block border-0 border-none p-0 px-4 py-2 text-base text-gray-700 no-underline hover:bg-transparent hover:text-green-700">
								<span :class="{ 'text-green-500': isActive }">Some Page</span>
							</RouterLink>
						</li>
					</ul>
				</div>
			</div>
		</header>

		<div class="mx-auto container">
			<RouterView />
		</div>
	</div>
</template>
