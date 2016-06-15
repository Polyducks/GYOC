function DisableDebugging ($compileProvider) {
	// disable debug info
	// to re-enable in production from console: angular.reloadWithDebugInfo()
	$compileProvider.debugInfoEnabled(false);
}

angular
	.module('tgcgApp')
	.config(DisableDebugging);
