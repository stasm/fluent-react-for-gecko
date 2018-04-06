import { MessageContext } from "fluent/compat";

const MOCK_RESOURCES = {
    "en-US": {
        "main.ftl": "title = Gecko Localization Example",
        "hello.ftl": "hello = Hello, { $username }!",
        "extra.ftl": "extra = Additional resource",
    },
    "pl": {
        "main.ftl": "title = Przykład Gecko Localization",
        "hello.ftl": "hello = Witaj { $username }!",
        "extra.ftl": "extra = Dodatkowy zasób",
    },
};

export default {
    async *generateContexts(locales, paths) {
        for (const locale of locales) {
            const mcx = new MessageContext(locale);
            for (const path of paths) {
                const resource = MOCK_RESOURCES[locale][path];
                mcx.addMessages(resource);
            }
            yield mcx;
        }
    }
}
