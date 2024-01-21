package com.gmt.todo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gmt.todo.model.TResponse;
import com.gmt.todo.model.TodoList;
import com.gmt.todo.model.TodoUserDetails;
import com.gmt.todo.service.ListService;
import com.gmt.todo.service.PersistCSVSerice;

@RestController
@CrossOrigin
@RequestMapping("/todo")
public class ListController {

	@Autowired
	private ListService listService;

	@Autowired
	private PersistCSVSerice persistCSVSerice;

	@RequestMapping("/list/listAll")
	public List<TodoList> getAllLists() {
		return listService.getAllLists();
	}

	@RequestMapping(value = "/list/listAllByUser/", method = RequestMethod.GET)
	public Map<String, List<TodoList>> getAllListsByUser() {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return listService.getGroupedListByUserId(userDetails.getUsername());
	}

	@RequestMapping(method = RequestMethod.POST, value = "/list/")
	public TResponse addNewList(@RequestBody TodoList todoList) {
		TResponse resp = new TResponse();
		try {
			TodoUserDetails userDetails = (TodoUserDetails) SecurityContextHolder.getContext().getAuthentication()
					.getPrincipal();
			todoList = listService.addNewList(todoList, userDetails);
			resp.setStatus("success");
			resp.setTodoList(todoList);
		} catch (Exception e) {
			resp.setStatus("failed");
			resp.setStatus(e.getMessage());
		}
		return resp;
	}

	@RequestMapping("/list/{listId}")
	public TodoList getAllListById(@PathVariable String listId) {
		return listService.findListById(Long.parseLong(listId));
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/list/{listId}")
	public TResponse updateList(@RequestBody TodoList list, @PathVariable String listId) {
		TResponse resp = new TResponse();
		try {
			list = listService.updateList(list, Long.parseLong(listId));
			resp.setStatus("success");
			resp.setTodoList(list);
		} catch (Exception e) {
			resp.setStatus("failed");
			resp.setError(e.getMessage());
		}
		return resp;
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/list/archiveList/{listId}")
	public TResponse archiveList(@PathVariable String listId) {
		TResponse resp = new TResponse();
		TodoList todoList = listService.archiveList(Long.parseLong(listId));
		resp.setStatus("success");
		resp.setTodoList(todoList);
		return resp;
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/list/{listId}")
	public TResponse deleteList(@PathVariable String listId) {
		TResponse resp = new TResponse();
		try {
			TodoList list = listService.findListById(Long.parseLong(listId));
			listService.deleteList(Long.parseLong(listId));
			resp.setTodoList(list);
			resp.setStatus("success");
		} catch (Exception e) {
			resp.setStatus("failed");
			resp.setError(e.getMessage());
		}
		return resp;
	}

	@RequestMapping("/addNewDefaultList")
	public List<TodoList> addNewDefaultList() {
		return persistCSVSerice.addNewDefaultList();
	}

	@RequestMapping(method = RequestMethod.GET, value = "/list/get-list-order/")
	public String getLIstOrder() {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return listService.getUserListOrder(userDetails.getUsername());
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/list/update-list-order/")
	public TResponse updateLIstOrder(@RequestBody String listOrderObj) {
		TResponse resp = new TResponse();
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		resp.setStatus(listService.updateLIstOrder(userDetails.getUsername(), listOrderObj));
		return resp;
	}

}
