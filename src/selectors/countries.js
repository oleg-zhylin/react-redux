import {createSelector} from "reselect";
import {selectResource} from "selectors";
import {Country} from "resources";

const selectCountriesByIdContinent = createSelector(
    [
        (state, id_continent = 'EU', key) => ({
            countries: selectResource(Country, state, key).get('list'),
            id_continent
        })
    ],
    ({countries, id_continent}) => countries.filter(
        country => country.get('id_continent') === id_continent
    )
);

export {
    selectCountriesByIdContinent
}