import { renderHook } from "@testing-library/react-hooks";
import { useMyName } from './useMyName'

describe("useMyName test", () => {
    it("verifies that it renders with no initial value", () => {
        const { result } = renderHook(() => useMyName());
        expect(result.current).toBe("My name is undefined");
    });

    it("verifies that it renders with initial value", () => {
        const { result } = renderHook(() => useMyName("Marry"));
        expect(result.current).toBe("My name is Marry");
    });

    it("verifies that it renders with rerender", () => {
        const { result, rerender } = renderHook(
            (initialName) => useMyName(initialName),
            {
                initialName: undefined,
            }
        );
        expect(result.current).toBe("My name is undefined");
        rerender("Marry");
        expect(result.current).toBe("My name is Marry");
    })
})