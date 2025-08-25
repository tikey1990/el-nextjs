import { unmountComponentAtNode } from "react-dom";
import { createRoot } from "react-dom/client";
import { act } from "@testing-library/react";

import { ReactPortal } from "./ReactPortal";

let container = null;
let root = null;
beforeEach(() => {
    // создаем DOM-элемент, в который мы будем рендерить
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
});

afterEach(() => {
    // подчищаем после завершения
    if (root) {
        root.unmount();
    }
    if (container) {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    }
});

it("отображает дочерние элементы и добавляет/удаляет элемент-оболочку", async () => {
    await act(async () => {
        root.render(
            <ReactPortal wrapperId="test-id">
                <div>Test</div>
            </ReactPortal>
        );
    });

    // Проверяем, что элемент был создан и содержит правильный текст
    expect(document.getElementById("test-id").textContent).toBe("Test");

    await act(async () => {
        root.unmount();
    });

    // Проверяем, что элемент был удален
    expect(document.getElementById("test-id")).toBeNull();
});
