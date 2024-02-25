import { ChildrenType } from "../../../helpers/propTypes";
import PropTypes from "prop-types";
import React from "react";
import TabNavItem from "./tabNavItem/TabNavItem";
import { removeSpecialChars } from "../../../helpers/strings";

/**
 * @param {object} props
 * @param {function} props.isActive=() => false
 * @param {function} props.changeTab
 * @param {import("../Tabs").Tab[]} props.tabs=[]
 * @returns {JSX.IntrinsicElements.nav}
 */
export default function TabNav({ isActive = () => false, tabs = [], changeTab }) {
	const handleToggleTab = (nb) => {
		return () => {
			changeTab(nb);
		};
	};

	return (
		<nav>
			<ul className="list-inline">
				{tabs.map((tab, index) => (
					<TabNavItem isActive={isActive(index)} key={removeSpecialChars(tab.id)} onClick={handleToggleTab(index)}>
						{tab.name}
					</TabNavItem>
				))}
			</ul>
		</nav>
	);
}

TabNav.defaultProps = {
	isActive: () => false,
	tabs: []
};

TabNav.propTypes = {
	changeTab: PropTypes.func.isRequired,
	isActive: PropTypes.func.isRequired,
	tabs: PropTypes.arrayOf(PropTypes.shape({
		content: ChildrenType.isRequired,
		id: PropTypes.string.isRequired,
		name: ChildrenType.isRequired
	}))
};