import { createGlobalState } from "react-hooks-global-state";

let {useGlobalState: useLoggedIn, setGlobalState: setLoggedIn} = createGlobalState({ loggedIn: false });

export default { useLoggedIn, setLoggedIn };