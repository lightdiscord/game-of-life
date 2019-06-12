#![feature(drain_filter)]

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Ecosystem {
    width: usize,
    height: usize,
    alives: Vec<usize>,
    immutable: bool,
    cycle: usize,
}

pub struct Index;

impl Index {
    fn new_with_coords_and_width(x: usize, y: usize, width: usize) -> usize {
        y * width + x
    }

    fn y(idx: usize, width: usize) -> usize {
        idx / width
    }

    fn x(idx: usize, width: usize) -> usize {
        idx % width
    }

    fn around(idx: usize, width: usize, height: usize) -> Vec<usize> {
        let mut around = Vec::new();
        let x = Index::x(idx, width) as isize;
        let y = Index::y(idx, width) as isize;

        for x_offset in -1..=1 {
            for y_offset in -1..=1 {
                if x_offset == 0 && y_offset == 0 {
                    continue;
                }

                let x = x + x_offset;
                let y = y + y_offset;

                if x >= 0 && y >= 0 && x < width as isize && y < height as isize {
                    around.push(Index::new_with_coords_and_width(x as usize, y as usize, width));
                }
            }
        }

        return around;
    }
}

#[wasm_bindgen]
impl Ecosystem {
    pub fn new(width: usize, height: usize, alives: Vec<usize>) -> Self {
        Ecosystem {
            width,
            height,
            alives,
            immutable: false,
            cycle: 0
        }
    }

    pub fn next(&mut self) -> Option<Vec<usize>> {
        <Ecosystem as Iterator>::next(self)
    }

    fn is_alive(&self, idx: &usize) -> bool {
        self.alives.contains(idx)
    }
}

impl Iterator for Ecosystem {
    type Item = Vec<usize>;

    fn next(&mut self) -> Option<Self::Item> {
        if self.immutable {
            return None;
        }

        let current = self.alives.clone();
        let mut next = Vec::new();

        for x in 0..self.width {
            for y in 0..self.height {
                let idx = Index::new_with_coords_and_width(x, y, self.width);
                let alive = self.is_alive(&idx);
                let mut around = Index::around(idx, self.width, self.height);
                let around = around
                    .drain_filter(|idx| self.is_alive(idx))
                    .collect::<Vec<_>>()
                    .len();

                if (alive && (around == 2 || around == 3)) || (!alive && around == 3) {
                    next.push(idx);
                }
            }
        }

        if current == next {
            self.immutable = true;
            return None;
        }

        self.alives = next;
        self.cycle += 1;

        Some(self.alives.clone())
    }
}

#[wasm_bindgen]
pub fn sum(a: usize, b: usize) -> usize {
    a + b
}
