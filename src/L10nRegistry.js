import { MessageContext } from "fluent/compat";

const MOCK_RESOURCES = {
    "en-US": {
        "hello.ftl": "hello = Hello, { $username }!",
    },
    "pl": {
        "hello.ftl": "hello = Witaj { $username }!",
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
