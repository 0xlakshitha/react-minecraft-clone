import { nanoid } from 'nanoid'
import React from 'react'
import { create } from 'zustand'

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, val) => window.localStorage.setItem(key, JSON.stringify(val))

const useStore = create((set) => ({
    texture: "dirt",
    cubes: getLocalStorage("cubes") || [],

    addCube: (x, y, z) => {
        set((prev) => ({
            cubes: [
                ...prev.cubes,
                {
                    key: nanoid(),
                    pos: [x, y, z],
                    texture: prev.texture
                }
            ]
        }))
    },

    removeCube: (x, y, z) => {
        set((prev) => ({
            cubes: prev.cubes.filter(cube => {
                const [X, Y, Z] = cube.pos 
                return X != x || Y != y || Z != z
            })
        }))
    },

    setTexture: (texture) => {
        set(() => ({
            texture
        }))
    },

    saveWorld: () => {
        set((prev) => {
            setLocalStorage("cubes", prev.cubes)
            return prev
        })
    },

    resetWorld: () => {
        set(() => ({
            cubes: []
        }))
    }
}))

export default useStore