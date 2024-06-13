import React, { useEffect, useState } from 'react';

import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Swal from 'sweetalert2';



function Home() {

    let token = localStorage.getItem('token')
    let baseUrl = "https://route-movies-api.vercel.app/"
    let decoded = jwt_decode(token);
    let userID = decoded._id;
    const [notes, setNotes] = useState([]);

    //function to get all Notes
    async function getAllNotes() {
        let { data } = await axios.get(baseUrl + 'getUserNotes', {
            headers: {
                token,
                userID
            }
        });

        if (data.message == 'success') {
            setNotes(data.Notes);

        } else {
            setNotes([]);
        }
    }

    useEffect(() => {
        getAllNotes();
    }, []);

    const [note, setNote] = useState({ title: "", desc: "", userID, token });

    //function to get note
    function getNote({ target }) {
        setNote({ ...note, [target.name]: target.value });
    }

    //function to add Note
    async function addNote(e) {
        e.preventDefault();
        let { data } = await axios.post(baseUrl + "addNote", note);
 
        if (data.message == "success") {
            Swal.fire('Added!', '', 'success').then(() => {
                getAllNotes();
            })

        }
    }

    //function to delete Note
    async function deleteNote(NoteID) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                (async () => {
                    let { data } = await axios.delete(baseUrl + "deleteNote", {
                        data: {
                            NoteID,
                            token
                        }
                    })
                    if (data.message == "deleted") {
                        getAllNotes()
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })();
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    //function to get Note ID
    function getNoteID(NoteIndex) {

        document.querySelector('#exampleModal1 input').value = notes[NoteIndex].title
        document.querySelector('#exampleModal1 textarea').value = notes[NoteIndex].desc
        setNote({ ...note, 'title': notes[NoteIndex].title, "desc": notes[NoteIndex].desc, NoteID: notes[NoteIndex]._id })

    }
    
    //function to update Note
    async function updateNote(e) {
        e.preventDefault();
        let { data } = await axios.put(baseUrl + "updateNote", note)

        if (data.message == 'updated') {
            getAllNotes()
            Swal.fire(
                'Updated!',
                'Your file has been updated.',
                'success'
            )
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Soething went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    }

    return (

        <>
            <div className="container my-5 ">
                <div className="col-md-12 text-end">
                    <a className="add p-2 btn bg" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fas fa-plus-circle"></i> Add New</a>
                </div>
            </div>

            {/* <!-- Add Modal --> */}
            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form id="add-form" onSubmit={addNote}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content mt">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input onChange={getNote} placeholder="Type Title" name="title" className="form-control" type="text" />
                                <textarea onChange={getNote} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-bg-n text-white" data-bs-dismiss="modal" aria-label="Close">Close</button>
                                <button data-bs-dismiss="modal" type="submit" className="btn btn-bg-n text-white"><i className="fas fa-plus-circle"></i> Add Note</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* <!-- Edit Modal --> */}
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form id="edit-form" onSubmit={updateNote}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content mt">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input onChange={getNote} placeholder="Type Title" name="title" className="form-control" type="text" />
                                <textarea onChange={getNote} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-bg-n text-white" data-bs-dismiss="modal" aria-label="Close">Close</button>
                                <button data-bs-dismiss="modal" type="submit" className="btn btn-bg-n text-white">Update Note</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* <!--- Notes ---> */}

            <div className="container">

                <div className="row">
                    {notes.map((note, index) => {
                        return (
                            <div key={index} className="col-md-4 my-4">
                                <div className='sticky'></div>
                                <div className="note p-4">
                                    <h3 className="float-start">{note.title}</h3>
                                    <a onClick={() => { getNoteID(index) }} data-bs-toggle="modal" data-bs-target="#exampleModal1" ><i className="fas fa-edit float-end edit"></i></a>
                                    <a onClick={() => { deleteNote(note._id) }}> <i className="fas fa-trash-alt float-end px-3 del cursor"></i></a>
                                    <span className="clearfix"></span>
                                    <p>{note.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {notes.length == 0 ? <div className="row">
                    <h2 className='text-black text-center fw-bold fs-1'>No notes found</h2>
                </div> : ""}
            </div>
        </>
    )
}

export default Home
