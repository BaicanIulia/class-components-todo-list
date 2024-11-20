import { Box, Button, Container, SelectChangeEvent } from '@mui/material';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from '@components';
import { updateFilterStatus } from '@store';
import { TodoModal } from '@features';
import {
  PRIORITY_OPTIONS,
  SORT_BY_OPTIONS,
  STATUS_OPTIONS,
} from '@lib/constants';
import { FilterStatus, RootState } from '@types';
import { Dispatch } from 'redux';

type TodoHeaderProps = {
  filterStatus: FilterStatus;
  updateFilterStatus: (filter: Partial<FilterStatus>) => void;
};

type TodoHeaderState = {
  modalOpen: boolean;
};

class Header extends Component<TodoHeaderProps, TodoHeaderState> {
  constructor(props: TodoHeaderProps) {
    super(props);

    this.state = {
      modalOpen: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ modalOpen: true });
  };

  updateFilter = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    this.props.updateFilterStatus({ [name]: value });
  };

  render() {
    const {
      filterStatus: { status, priority, sortBy },
    } = this.props;
    const { modalOpen } = this.state;

    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button variant="contained" onClick={this.handleClickOpen}>
          Add Task
        </Button>
        <Box
          sx={{
            display: 'flex',
            flex: '1',
            marginLeft: 10,
            gap: 1,
          }}
        >
          <Dropdown
            value={status}
            name="status"
            label="Status"
            handleChange={this.updateFilter}
            options={STATUS_OPTIONS}
          />
          <Dropdown
            value={priority}
            name="priority"
            label="Priority"
            handleChange={this.updateFilter}
            options={PRIORITY_OPTIONS}
          />
          <Dropdown
            value={sortBy}
            name="sortBy"
            label="Sort by"
            handleChange={this.updateFilter}
            options={SORT_BY_OPTIONS}
          />
        </Box>
        <TodoModal
          modalOpen={modalOpen}
          setModalOpen={(value) => this.setState({ modalOpen: value })}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  filterStatus: state.todo.filterStatus,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateFilterStatus: (filter: Partial<FilterStatus>) =>
    dispatch(updateFilterStatus(filter)),
});

export const TodoHeader = connect(mapStateToProps, mapDispatchToProps)(Header);
