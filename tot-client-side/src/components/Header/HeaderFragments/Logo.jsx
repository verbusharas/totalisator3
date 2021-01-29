import {Link} from "react-router-dom";
import logo from "../../../assets/logo.svg";
import Select from "react-select";
import useUser from "../../../hooks/useUser";
import useTotalisator from "../../../hooks/useTotalisator";
import {useDispatch} from "react-redux";
import {fetchTotalisatorById} from "../../../api/totalisatorApi";
import {setTotalisator} from "../../../store/slices/totalisatorSlice";

const Logo = () => {

    const customStyles = {
        control: (base, state) => ({...base,
            background: "var(--black-brown)",
            border:"none",
            borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
            borderColor: state.isFocused ? "var(--yellow)" : "var(--dark-teal)",
            boxShadow: state.isFocused ? null : null,
            width: "300px",
        }),
        menu: base => ({...base,
            borderRadius: 0,
            marginTop: 0,
        }),
        menuList: base => ({...base,
            padding: 0,
        }),
        option: (base, state) => ({...base,
            backgroundColor: "var(--black-teal)",
            "&:hover": {
                backgroundColor: "var(--dark-teal)",
            },
            color: state.isSelected ?  "var(--white-blue)" : "var(--light-teal)",
        }),
        singleValue: base => ({ ...base, color: "var(--white-blue)"}),
        placeholder: (base) => {
            return {...base,
                color: "var(--white-blue)",
            }
        },
        dropdownIndicator: base => ({ ...base,
            color: "var(--light-teal)",
            "&:hover": {
                color: "var(--white-blue)"
            }}),
        indicatorSeparator: base => ({
            ...base,

            display: 'none'
        }),
    }

    const user = useUser();
    const totalisator = useTotalisator();
    const dispatch = useDispatch()


    const getTotalisatorOptions = () => {

        return user.totalisators.map(t => {
            const isUserManager = user.managedTotalisators.includes(t.id);
            return (
                {
                    label: isUserManager ? `✪ ${t.title}`: t.title,
                    value: t.id
                }
            )
        });
    }

    const switchTotalisator = (event) => {
        fetchTotalisatorById(event.value).then(res=>{
            console.log("res.data", res.data)
            dispatch(setTotalisator(res.data))
        })
        console.log(event.value)
    }

    return (
        <div className="logo">
            <Link to="/">
                <img className="logo__img" src={logo} alt="logo"/>
            </Link>
            {user &&
            <div>
                {totalisator &&
                <Select styles={customStyles}
                        options={getTotalisatorOptions()}
                        value={getTotalisatorOptions().find(opt => opt.value === totalisator.id)}
                        defaultValue={getTotalisatorOptions().find(opt => opt.value === totalisator.id)}
                        onChange={(e)=> switchTotalisator(e)}
                />
                }
            </div>}
        </div>
    )
}
export default Logo;
