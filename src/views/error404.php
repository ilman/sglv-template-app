

<div class="section">

	<div class="container">
		<div class="text-center">
			<?php echo SG_Tags::spacer() ?>
			<p class="text-6x text-secondary"><i class="fa fa-warning"></i></p>
			<h2 class="text-ucase text-bold"><?php echo trans('text.page_not_found_lead') ?></h2>
			<p class="small"><?php echo Request::url(); ?></p>
			<p><?php echo trans('text.page_not_found_desc') ?></p>
			<?php echo SG_Tags::spacer() ?>
			<form class="block-search" action="<?php echo url('p/search') ?>">
				<div class="input-group">
					<input type="text" class="form-control input-lg" name="filter">
					<span class="input-group-btn btn-group-lg">
						<button class="btn btn-lg btn-primary" type="submit">
							<i class="fa fa-fw fa-search"></i> Search
						</button>
					</span>
				</div>
			</form>
		</div>

	</div>
	<!-- container -->

</div>