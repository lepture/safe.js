
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

standalone:
	@echo "(function(root) {" > safe.js
	@cat lib/index.js >> safe.js
	@cat lib/client.js >> safe.js
	@echo "this.safe = safe;" >> safe.js
	@echo "})(this);" >> safe.js
	@sed -i.bak "s/module.exports/\/\//g" safe.js
	@sed -i.bak "s/var\ safe/\/\//g" safe.js
	@rm safe.js.bak

test:
	@mocha

.PHONY: clean
