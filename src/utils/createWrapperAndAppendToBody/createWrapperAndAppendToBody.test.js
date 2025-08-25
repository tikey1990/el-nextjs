// Импортируем функцию из тестируемого модуля
import { createWrapperAndAppendToBody } from "./createWrapperAndAppendToBody";

describe("createWrapperAndAppendToBody", () => {
    beforeEach(() => {
        // Очищаем body перед каждым тестом
        document.body.innerHTML = "";
    });

    it("должна создавать элемент div с правильным id и добавлять его в body", () => {
        const wrapperId = "test-wrapper";
        const wrapperElement = createWrapperAndAppendToBody(wrapperId);
        expect(wrapperElement).toBeDefined();
        expect(wrapperElement.tagName).toBe("DIV");
        expect(wrapperElement.getAttribute("id")).toBe(wrapperId);
        expect(document.body.contains(wrapperElement)).toBe(true);
    });

    it("должна возвращать созданный элемент div", () => {
        const wrapperId = "test-wrapper";
        const wrapperElement = createWrapperAndAppendToBody(wrapperId);
        expect(wrapperElement).toBeInstanceOf(HTMLElement);
    });
});
