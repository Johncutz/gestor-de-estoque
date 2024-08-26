import { useState } from "react";

export default function useItemCollection() {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("obc-item-lib");
    if (!storedItems) return [];
    return JSON.parse(storedItems);
  });

  const formatDate = (date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const addItems = ({ name, qtd, price, desc, select }) => {
    const id = Math.floor(Math.random() * 1000000);
    const now = new Date();
    const formattedDate = formatDate(now);
    const numberQtd = parseInt(qtd);
    const item = {
      id,
      name,
      qtd: numberQtd,
      price,
      desc,
      select,
      createdAt: formattedDate,
      updatedAt: formattedDate,
    };
    setItems((state) => {
      const newState = [...state, item];
      localStorage.setItem("obc-item-lib", JSON.stringify(newState));
      return newState;
    });
  };

  const removeItems = (id) => {
    setItems((state) => {
      const newState = state.filter((item) => item.id !== id);
      localStorage.setItem("obc-item-lib", JSON.stringify(newState));
      return newState;
    });
  };

  const updateItems = (id, updatedData) => {
    const now = new Date();
    const formattedDate = formatDate(now);
    setItems((state) => {
      const newState = state.map((item) =>
        item.id === id
          ? { ...item, ...updatedData, updatedAt: formattedDate }
          : item
      );
      localStorage.setItem("obc-item-lib", JSON.stringify(newState));
      return newState;
    });
  };

  return { items, addItems, removeItems, updateItems };
}
