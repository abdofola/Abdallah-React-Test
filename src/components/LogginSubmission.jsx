import React from "react";
import Login from "./Login";

export default function LogginSubmission() {
  const [formData, setFormData] = React.useState(null);
  const { status, responseData, errorMessage } = useFormSubmission({
    endpoint: "https://jsonplaceholder.typicode.com/users",
    data: formData,
  });

  return (
    <>
      {status === "resolved" ? (
        <div>
          Welcome <strong>{responseData.username}</strong>
        </div>
      ) : (
        <Login onSubmit={(data) => setFormData(data)} />
      )}
      <div style={{ height: 200 }}>
        {status === "pending" && <span>Loading ...</span>}
        {status === "rejected" && (
          <div role="alert" style={{ color: "red" }}>
            {errorMessage}
          </div>
        )}
      </div>
    </>
  );
}

function formSubmissionReducer(state, action) {
  const reducerLookup = {
    START: (state, action) => ({
      status: "pending",
      responseData: null,
      errorMessage: null,
    }),
    RESOLVE: (state, action) => ({
      ...state,
      status: "resolved",
      responseData: action.responseData,
    }),
    REJECT: (state, action) => ({
      ...state,
      status: "rejected",
      errorMessage: action.error.message,
    }),
  };

  return action.type in reducerLookup
    ? reducerLookup[action.type](state, action)
    : state;
}

function useFormSubmission({ endpoint, data }) {
  const [state, dispatch] = React.useReducer(formSubmissionReducer, {
    status: "idle",
    responseData: null,
    errorMessage: null,
  });

  const body = data ? JSON.stringify(data) : null;

  React.useEffect(() => {
    let ignore = false;
    if (body) {
      dispatch({ type: "START" });
      window
        .fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body,
        })
        .then(async (res) => {
          const data = await res.json();
          if (!ignore)
            res.ok
              ? dispatch({ type: "RESOLVE", responseData: data })
              : Promise.reject(new Error(data.message)).then(
                  function noop() {},
                  (error) =>
                    dispatch({
                      type: "REJECT",
                      error,
                    })
                );
        });
    }

    //cleanup
    return () => (ignore = true);
  }, [body, endpoint]);

  return state;
}
