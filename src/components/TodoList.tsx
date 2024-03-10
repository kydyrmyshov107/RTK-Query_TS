import { useState } from "react";
import {
  useCreateTodoMutation,
  useGetTodosQuery,
  useDeleteTodoMutation,
  usePatchTodoMutation,
} from "../redux/api/crud";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import trash from "../../src/assets/trash.svg";
import editimg from "../assets/edit.svg";

const TodoList = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { data, isLoading } = useGetTodosQuery();
  const [createTodo] = useCreateTodoMutation();
  const [deleteItems] = useDeleteTodoMutation();
  const [updates] = usePatchTodoMutation();
  const [newFirstName, setNewFirtsName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [isEdit, setIsEdit] = useState(null);
  const notifyError = () => toast.error("Заполните все поля!");
  const notifySucces = () => toast.success("Успешно добавлено");

  const addTodo = async () => {
    if (firstName === "" || lastName === "") {
      notifyError();
    } else {
      await createTodo({ firstName, lastName });
      notifySucces();
    }
    setFirstName("");
    setLastName("");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteData = async (_id: any) => {
    await deleteItems(_id).unwrap();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const edit = (item: any) => {
    setNewFirtsName(item.firstName);
    setNewLastName(item.lastName);
    setIsEdit(item._id);
  };

  const saveTodo = async (_id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newData: any = {
      firstName: newFirstName,
      lastName: newLastName,
    };
    await updates({
      _id,
      newData,
    }).unwrap();

    setNewFirtsName("");
    setNewLastName("");
    setIsEdit(null);
  };

  return (
    <div>
      <StyledHeader>
        <input
          type="text"
          placeholder="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button onClick={addTodo}> Add</button>
      </StyledHeader>
      {isLoading ? (
        <>
          <h1 style={{ textAlign: "center" }}>Loading . . .</h1>
        </>
      ) : (
        <>
          <CardsStyle>
            {data?.map((item) => (
              <div key={item._id}>
                {isEdit === item._id ? (
                  <>
                    <EditStyle>
                      <input
                        type="text"
                        value={newFirstName}
                        onChange={(e) => setNewFirtsName(e.target.value)}
                      />
                      <input
                        type="text"
                        value={newLastName}
                        onChange={(e) => setNewLastName(e.target.value)}
                      />
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button onClick={() => saveTodo(item._id!)}>
                          save
                        </button>
                        <button onClick={() => setIsEdit(null)}>cancel</button>
                      </div>
                    </EditStyle>
                  </>
                ) : (
                  <>
                    <CardStyle>
                      <p>{item.firstName}</p>
                      <p>{item.lastName}</p>

                      <img
                        onClick={() => edit(item)}
                        src={editimg}
                        alt="image"
                      />
                      <img
                        onClick={() => deleteData(item._id!)}
                        src={trash}
                        alt="image"
                      />
                    </CardStyle>
                  </>
                )}
              </div>
            ))}
          </CardsStyle>
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default TodoList;

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  input {
    font-family: "Courier New", Courier, monospace;
    font-weight: bold;
    font-size: 0.8vw;
    color: #fff;
    background-color: rgb(28, 28, 30);
    box-shadow: 0 0 0.4vw rgba(255, 245, 245, 0.5), 0 0 0 0.15vw transparent;
    border-radius: 0.4vw;
    border: none;
    outline: none;
    padding: 0.4vw;
    max-width: 190px;
    transition: 0.4s;
  }

  input:hover {
    box-shadow: 0 0 0 0.15vw rgba(135, 207, 235, 0.186);
  }

  input:focus {
    box-shadow: 0 0 0 0.15vw #fff;
  }
  button {
    font-family: "Courier New", Courier, monospace;
    font-weight: bold;
    font-size: 14px;
    padding: 3px 15px;
    transition: all 0.1s;
    border-radius: 5px;
    color: #000000;
    box-shadow: 0px 6px 0px #ffffff;
    background-color: #ffffff;
    border: none;
  }

  button:active {
    box-shadow: 0px 2px 0px #ffffff;
    position: relative;
    top: 2px;
  }
`;

const CardsStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
`;
const CardStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 390px;
  border: 2px solid;
  border-radius: 10px;
  width: 700px;
  height: 70px;
  padding: 11px;
  img {
    height: 30px;
  }
`;
const EditStyle = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 700px;
  margin-left: 390px;
  border: 2px solid;
  border-radius: 10px;
  padding: 10px;

  input {
    padding: 6px 14px;
    border-radius: 8px;
    color: #ffffff;
    outline: none;
    border: none;
    box-shadow: 2px 2px 7px 0 rgb(0, 0, 0, 0.2);
  }

  input:active {
    animation: justshake 0.3s forwards;
    color: #ffffff;
  }

  @keyframes justshake {
    25% {
      transform: translateX(5px);
    }

    50% {
      transform: translateX(-5px);
    }

    75% {
      transform: translateX(5px);
    }

    100% {
      transform: translateX-(5px);
    }
  }

  button {
    font-family: "Courier New", Courier, monospace;
    font-weight: bold;
    transition: all 0.1s;
    border-radius: 5px;
    color: #000000;
    padding: 5px 15px;
    /* box-shadow: 0px 6px 0px #ffffff; */
    background-color: #ffffff;
    border: none;
  }

  button:active {
    box-shadow: 0px 2px 0px #ffffff;
    position: relative;
    top: 2px;
  }
`;
