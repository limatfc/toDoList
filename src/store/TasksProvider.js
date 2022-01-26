import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TasksContext from "./tasks-context";

// This file is too long -1
// We would explain how to break it into 2 files the Context and the reducer during class
const TasksProvider = (props) => {
  const [inputedTasks, setInputedTasks] = useState([]);
  const navigate = useNavigate();

  // This is too long, you need to refactor it
  const getLocalData = () => {
    const getLocalData = localStorage.getItem("storedInputedTasks");
    const localData = JSON.parse(getLocalData);
    if (localData && localData.length > 0) {
      localData.find((incompleteTask) => {
        if (incompleteTask.status === "incomplete") {
          navigate("/shoppinglist");
          setInputedTasks(localData);
        } else {
          navigate("/");
          setInputedTasks(localData);
        }
        return incompleteTask.status === "incomplete";
      });
    }
    if (!localData || localData.length === 0) {
      navigate("/");
    }
  };

  // No comment in production -1
  // No "please don't check this line ESlint" -1
  // Either dont use ESlint or take the time to find the problem and fix it
  // You literally just told the reviewer, that you have "a skeleton hidding in the closet"
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getLocalData, []);

  useEffect(() => {
    localStorage.setItem("storedInputedTasks", JSON.stringify(inputedTasks));
  }, [inputedTasks]);

  const inputedTaskHandler = (items) => {
    setInputedTasks((prevItems) => {
      return [items, ...prevItems];
    });
  };

  const onTaskChangeHandler = (keyValue) => {
    setInputedTasks((prevItems) => {
      const copyPrevItems = [...prevItems];
      const find = copyPrevItems.find((itemKey) => itemKey.key === keyValue);
      find.status = "complete";
      return [...copyPrevItems];
    });
  };

  const sortByName = () => {
    const copyInputedTasks = [...inputedTasks];
    const sortedName = copyInputedTasks.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
    setInputedTasks(sortedName);
  };

  const sortByPrice = () => {
    const copyInputedTasks = [...inputedTasks];
    const sortedPrice = copyInputedTasks.sort((a, b) => {
      return a.price - b.price;
    });
    setInputedTasks(sortedPrice);
  };

  const taskContext = {
    inputedTasks,
    inputedTaskHandler: inputedTaskHandler,
    onTaskChangeHandler: onTaskChangeHandler,
    sortByName: sortByName,
    sortByPrice: sortByPrice,
  };

  return (
    <TasksContext.Provider value={taskContext}>
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
