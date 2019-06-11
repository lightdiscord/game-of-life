use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn sum(a: usize, b: usize) -> usize {
    a + b
}
