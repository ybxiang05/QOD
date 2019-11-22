<form role="search" method="get" class="search-form" action="<?php echo home_url( '/' ); ?>">
		<label>
			<input type="search" class="search-field" placeholder="SEARCH ..." value="<?php echo esc_attr( get_search_query() ); ?>" name="s" title="Search for:" />
		</label>
		<div class="search-submit">
			<a href="<?php echo esc_html( 'Search' ); ?>">
				<i class="fas fa-search" ></i>
			</a>
				
		</div>
</form>
