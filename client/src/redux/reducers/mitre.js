import * as types from '../constants';

const initialState = {
  mitreNavigator: [],
  realAttackPaths: [],
  allAttackPaths: {},
  filteredAttackPaths: {},
  loader: true
};

const getAttackNodesAndLinks = (payload) => {
  // const attackersPath = payload
  //   .reduce((r, { ip, techniques }) => {
  //     if (r.get(ip)) {
  //       r.get(ip).techniques.push(...techniques);
  //     } else {
  //       r.set(ip, { ip, techniques });
  //     }
  //     return r;
  //   }, new Map())
  //   .values();

  let resp = [];
  if (payload) {
    payload.map((data) => {
      const index = resp.findIndex((el) => el.ip === data.ip);
      if (index !== -1) {
        resp[index].techniques.push(...data.techniques);
      } else {
        resp.push({ ip: data.ip, techniques: [...data.techniques] });
      }
      return resp;
    });
  }

  const nodes = [
    {
      id: 'a-a-MITRE',
      name: 'MITRE ATT&CK',
      ip: '',
      techId: 'MITRE ATT&CK',
      tactics: []
    }
  ];
  const techStack = [];
  // [...attackersPath]
  // attackersPath &&
  resp
    .filter((attack) => attack.techniques.length > 0)
    .map((attack, i) => {
      techStack.push(attack.techniques);
      return (
        attack &&
        attack.techniques.map((tech, index) => {
          if (nodes.filter((data) => data.id === `${i}-${index}-${tech?.name}`).length === 0) {
            nodes.push({
              id: `${i}-${index}-${tech?.name}`,
              name: tech?.name,
              ip: attack?.ip,
              techId: tech?._id,
              tactics: tech?.parent
            });
          }
          return nodes;
        })
      );
    });

  const links = [];
  if (techStack) {
    techStack.map((techs, key) => {
      // const techs = tech.filter(
      //   (value, index, self) => index === self.findIndex((t) => t._id === value._id)
      // );
      for (let i = 0; i < techs.length; i++) {
        let data = {};
        if (i !== 0) {
          data = {
            value: 70,
            source: `${key}-${i - 1}-${techs[i - 1].name}`,
            target: `${key}-${i}-${techs[i].name}`
          };
        } else {
          data = {
            value: 1,
            source: 'a-a-MITRE',
            target: `${key}-${i}-${techs[i].name}`
          };
        }
        if (data.source && data.target) {
          links.push(data);
        }
      }
      return links;
    });
  }

  return {
    nodes: [...nodes],
    links: [...links]
  };
};

const geFilteredDetails = (payload) => {
  const { startDate, endDate } = payload.date;
  let filteredPayload = [];
  filteredPayload =
    endDate &&
    payload?.realAttackPaths.filter((fil) => fil.date >= startDate && fil.date <= endDate);
  return getAttackNodesAndLinks(filteredPayload?.length > 0 && filteredPayload);
};

const MITREREDUCER = (state = initialState, action) => {
  if (action) {
    switch (action.type) {
      case types.GET_MITRE_NAVIGATOR_SUCCESS:
        return {
          ...state,
          mitreNavigator: action.payload,
          loader: false
        };
      case types.GET_MITRE_NAVIGATOR_FAILURE:
        return {
          ...state,
          mitreNavigator: [],
          loader: false
        };
      case types.GET_ATTACK_PATHS_SUCCESS:
        return {
          ...state,
          realAttackPaths: action.payload && action.payload.data,
          allAttackPaths: getAttackNodesAndLinks(action.payload && action.payload.data),
          loader: false
        };
      case types.GET_ATTACK_PATHS_FAILURE:
        return {
          ...state,
          allAttackPaths: {},
          filteredAttackPaths: {},
          loader: false
        };
      case types.GET_FILTERED_ATTACK_PATHS_SUCCESS:
        return {
          ...state,
          filteredAttackPaths: geFilteredDetails(action.payload),
          loader: false
        };
      default:
        return state;
    }
  }
  return state;
};
export { MITREREDUCER };
